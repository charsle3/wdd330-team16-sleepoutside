import ExternalServices from "./ExternalServices.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ExternalServices("tents");
const productID = getParam("product");

// Initialize Product Details
const specificProduct = new ProductDetails(productID, dataSource);
specificProduct.init();

loadHeaderFooter();
document.querySelector("#discount").textContent = "20% OFF";

// --- COMMENTS SUBSYSTEM INTEGRATION ---
if (productID) {
  renderProductComments(productID);
  setupCommentForm(productID);
}

/**
 * Fetches product-specific comments from localStorage and updates the DOM.
 * @param {string} id - The unique product identifier.
 */
function renderProductComments(id) {
  const container = document.getElementById("comments-container");
  if (!container) return;

  const allComments = JSON.parse(localStorage.getItem("so_product_comments")) || {};
  const productComments = allComments[id] || [];

  if (productComments.length === 0) {
    container.innerHTML = `<p class="no-comments" style="color: #666; font-style: italic;">No reviews yet. Be the first to review this product!</p>`;
    return;
  }

  container.innerHTML = productComments
    .map(
      (comment) => `
    <div class="comment-card" style="border-bottom: 1px solid #ddd; padding: 12px 0; margin-bottom: 10px;">
      <p style="margin: 0 0 4px 0;">
        <strong>${escapeHTML(comment.author)}</strong> 
        <small style="color: #777;">(${comment.date})</small>
      </p>
      <p style="margin: 0; color: #333;">${escapeHTML(comment.text)}</p>
    </div>
  `
    )
    .join("");
}

/**
 * Hooks up the submit event listener to the review form.
 * @param {string} id - The unique product identifier.
 */
function setupCommentForm(id) {
  const form = document.getElementById("comment-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const authorInput = document.getElementById("comment-author");
    const textInput = document.getElementById("comment-text");

    const newComment = {
      author: authorInput.value.trim(),
      text: textInput.value.trim(),
      date: new Date().toLocaleDateString(),
    };

    // Pull, push, and update localStorage safely
    const allComments = JSON.parse(localStorage.getItem("so_product_comments")) || {};
    if (!allComments[id]) {
      allComments[id] = [];
    }
    allComments[id].push(newComment);
    localStorage.setItem("so_product_comments", JSON.stringify(allComments));

    // Refresh display view and wipe fields clean
    renderProductComments(id);
    form.reset();
  });
}

/**
 * Utility to eliminate Cross-Site Scripting (XSS) issues from malicious text inputs.
 */
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
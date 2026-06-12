import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// 1. Grab both potential parameters from the URL
const category = getParam("category");
const searchQuery = getParam("search");

const dataSource = new ExternalServices();
const element = document.querySelector(".product-list");

// 2. Initialize the ProductList instance
// We pass both category and searchQuery. (Make sure your ProductList.mjs is updated to accept it!)
const listing = new ProductList(category, dataSource, element, searchQuery);

listing.init();

// 3. Update the page heading dynamically based on what the user is viewing
const pageTitleElement = document.querySelector(".products h2");
if (pageTitleElement) {
  if (searchQuery) {
    pageTitleElement.textContent = `Search Results for: "${searchQuery}"`;
  } else if (category) {
    // Format category name nicely (e.g., "sleeping-bags" becomes "Sleeping Bags")
    const formattedCategory = category
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    pageTitleElement.textContent = `Top Products: ${formattedCategory}`;
  }
}
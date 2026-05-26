import { getLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      `<p class="empty-cart">Your cart is currently empty.</p>`;
    return;
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryLarge}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function calculateTotal() {
  const totalElement = document.querySelector("#cart-total");
  let totalCost = 0;

  if (document.querySelector(".product-list").innerHTML != "") {
    document.querySelector(".cart-footer").classList.remove("hide");

    const cartItems = getLocalStorage("so-cart");
    cartItems.forEach((item) => {
      totalCost += item.FinalPrice * item.quantity;
    });

    totalElement.innerHTML = `<h2>Total: $${totalCost}</h2>`;
  }
}

renderCartContents();

calculateTotal();

import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

//get existing cart items and (if they exist) add them to an array with the item to be added, and save it all to localstorage
function addProductToCart(product) {
  const existingCart = getLocalStorage("so-cart");
  const products = [];

  if (existingCart != null) {
    existingCart.forEach((item) => {
      products.push(item);
    });
  }

  products.push(product);

  setLocalStorage("so-cart", products);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);

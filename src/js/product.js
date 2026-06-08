import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const productID = getParam("product");

const specificProduct = new ProductDetails(productID, dataSource);
specificProduct.init();

loadHeaderFooter();
document.querySelector("#discount").textContent = "20% OFF";

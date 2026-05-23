import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const productID = getParam("product");

const specificProduct = new ProductDetails(productID, dataSource);
specificProduct.init();

loadHeaderFooter();

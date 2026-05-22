import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const tents = new ProductData("tents");
const products = new ProductList("tents", tents, document.getElementById('product-list'));
products.init();

loadHeaderFooter();
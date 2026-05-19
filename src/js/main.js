import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
 
    const tents = new ProductData("tents")

    const products = new ProductList("tents", tents, document.querySelector('.product-list'));

    products.init();
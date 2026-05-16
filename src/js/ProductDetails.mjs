import { setLocalStorage } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';

export default class ProductDetails {
      constructor(productId, dataSource){
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }

    async init() {
      this.product = await this.dataSource.findProductById(this.productId);
      

      this.renderProductDetails();

      // document.getElementById('addToCart').addEventListener('click', this.addProductToCart(this.product).bind(this));
      document.getElementById('addToCart').addEventListener('click', () => {
        this.addProductToCart(this.product);
      });
    }

    addProductToCart(product) {
      const existingCart = getLocalStorage('so-cart');
      const products = [];
    
      if (existingCart != null) {
        existingCart.forEach((item) => {
          products.push(item);
        });
      }
    
      products.push(product);
    
      setLocalStorage("so-cart", products);
    }

    renderProductDetails() {
      const brand = document.getElementById('brand');
      brand.innerHTML = this.product.Brand.Name;

      const nameWOBrand = document.getElementById('nameWOBrand');
      nameWOBrand.innerHTML = this.product.NameWithoutBrand;

      const img = document.getElementById('productImage');
      img.setAttribute("src", this.product.Image);
      img.setAttribute("alt", this.product.Name);

      const price = document.getElementById('price');
      price.innerHTML = this.product.FinalPrice;

      const color = document.getElementById('color');
      color.innerHTML = this.product.Colors[0].ColorName;

      const description = document.getElementById('description');
      description.innerHTML = this.product.DescriptionHtmlSimple;
    }
}
import { setLocalStorage } from './utils.mjs';
import { getLocalStorage, alertMessage, renderBreadcrumbs } from './utils.mjs';

export default class ProductDetails {
      constructor(productId, dataSource){
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }

    async init() {
      this.product = await this.dataSource.findProductById(this.productId);
      
      renderBreadcrumbs(this.product.Category, 0, true);

      this.renderProductDetails();

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
        alertMessage('Item added succesfuly')
      }
      
      const existingProduct = products.find((item) => item.Id === product.Id);

      if (existingProduct) {
        let currentQuantity = parseInt(existingProduct.quantity);
        if (isNaN(currentQuantity)) {
          currentQuantity = 1;
        }
        existingProduct.quantity = currentQuantity + 1;
      } else {
        product.quantity = 1;
        products.push(product);
      }
    
      setLocalStorage("so-cart", products);
    }

    renderProductDetails() {
      const brand = document.getElementById('brand');
      brand.innerHTML = this.product.Brand.Name;

      const nameWOBrand = document.getElementById('nameWOBrand');
      nameWOBrand.innerHTML = this.product.NameWithoutBrand;

      const img = document.getElementById('productImage');
      img.setAttribute("src", this.product.Images.PrimaryLarge);
      img.setAttribute("alt", this.product.Name);

      const price = document.getElementById('price');
      price.innerHTML = this.product.FinalPrice;

      const color = document.getElementById('color');
      color.innerHTML = this.product.Colors[0].ColorName;

      const description = document.getElementById('description');
      description.innerHTML = this.product.DescriptionHtmlSimple;
    }
}
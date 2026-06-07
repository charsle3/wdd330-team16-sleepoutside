import { renderListWithTemplate, renderBreadcrumbs } from "./utils.mjs";

function productCardTemplate(product) {
  if (product.SuggestedRetailPrice > product.FinalPrice) // Check for discounts
    return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}  <span id="discount">-$${Math.round(product.SuggestedRetailPrice - product.FinalPrice)}!!</span></p>
      </a>
    </li>
    `;
  else
    return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

    async init() {
    document.querySelector(".title").textContent = this.category;
    
    const list = await this.dataSource.getData(this.category);
    const totalItems = list.length;

    renderBreadcrumbs(this.category, totalItems, false);

    this.renderList(list);
  }

    renderList(products) {
        renderListWithTemplate(productCardTemplate, this.listElement, products);
    }
}
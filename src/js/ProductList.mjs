import { renderListWithTemplate } from "./utils.mjs";

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
  // Added searchQuery parameter to the constructor (defaulting to null if missing)
  constructor(category, dataSource, listElement, searchQuery = null) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.searchQuery = searchQuery;
  }

  async init() {
    let list = [];

    // Safely update the page title elements if they exist on the targeted DOM structure
    const titleElement = document.querySelector(".title");
    if (titleElement && this.category) {
      titleElement.textContent = this.category;
    }

    if (this.searchQuery) {
      // 1. If it's a search query, fetch across all core categories in the store ecosystem
      const categoriesToSearch = ["tents", "backpacks", "sleeping-bags", "hammocks"];
      const fetchPromises = categoriesToSearch.map(cat => this.dataSource.getData(cat).catch(() => []));
      
      // Resolve all fetches in parallel and flatten the distinct nested arrays into a single list
      const allResults = await Promise.all(fetchPromises);
      list = allResults.flat();

      // 2. Locally filter the master catalog with case-insensitive checking against name and brand data
      const cleanQuery = this.searchQuery.toLowerCase();
      list = list.filter(product => 
        (product.Name && product.Name.toLowerCase().includes(cleanQuery)) || 
        (product.Brand && product.Brand.Name.toLowerCase().includes(cleanQuery)) ||
        (product.DescriptionHtmlSimple && product.DescriptionHtmlSimple.toLowerCase().includes(cleanQuery))
      );
    } else if (this.category) {
      // Standard target operation: Fetch specifically for a selected navigation category
      list = await this.dataSource.getData(this.category);
    }

    this.renderList(list);
  }

  renderList(products) {
    // Empty the target element list first to ensure previous layouts clean up completely before render
    this.listElement.innerHTML = "";
    
    if (products.length === 0) {
      this.listElement.innerHTML = `<p class="no-products-msg">No products match your criteria. Try adjusting your search term.</p>`;
      return;
    }

    renderListWithTemplate(productCardTemplate, this.listElement, products);
  }
}
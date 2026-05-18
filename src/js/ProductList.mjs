import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
    constructor(productCategory, datasource, targetElement) {
        this.productCategory = productCategory;
        this.datasource = datasource;
        this.targetElement = targetElement;
    }

    async init() {
        const list = await this.datasource.getData();
        console.log(list);

        this.renderList(list);
    }

    productCardTemplate(product) {
        const htmlTemplate = `
            <li class="product-card">
                <a href="product_pages/?product=${product.Id}">
                    <img
                    src="${product.Image}"
                    alt="${product.Name}"
                    />
                    <h3 class="card__brand">${product.Brand.Name}</h3>
                    <h2 class="card__name">${product.Name}</h2>
                    <p class="product-card__price">${product.FinalPrice}</p>
                </a>
            </li>
        `
        return htmlTemplate;
    }

    renderList(products) {
        renderListWithTemplate(this.productCardTemplate, this.targetElement, products);
    }
}
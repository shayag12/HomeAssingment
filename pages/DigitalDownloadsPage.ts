import { expect, type Locator, type Page } from '@playwright/test';
import { logger } from '../loggerUtils';


export class DigitalDownloadsPage {
    readonly page: Page;
    readonly items: Locator;
    readonly addTocartButton: Locator;
    readonly productName: Locator;

    constructor (page: Page) {
        this.page = page;
        this.items = page.locator('.product-title');
        this.addTocartButton = page.locator('.add-to-cart-button');
        this.productName = page.locator('.product-name');
    }
    async selectRandomItem(){ // select a random item and adds to cart and validates the product name
        logger.info('Selecting a random item');
        const count = await this.items.count();
        const randomIndex = Math.floor(Math.random() * count);
        await this.items.nth(randomIndex).click();
        var productName = await this.productName.textContent();
        logger.info('Selected item is: ' + productName);
        await this.addTocartButton.scrollIntoViewIfNeeded();
        await this.addTocartButton.click();
        logger.info('Item has been added to cart');
        await this.page.reload();
        var cartProductName = await this.productName.textContent();
        logger.info('cart product name is: ' +cartProductName );

         // Assert that the product names are the same
         expect(cartProductName).toBe(productName);
         logger.info('Product name is as expected');
    }
}
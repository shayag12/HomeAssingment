import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly registerButton: Locator;
    readonly shoppingCartButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.registerButton = page.locator('.ico-register');
        this.shoppingCartButton = page.locator('#topcartlink'); 
    }
    async clickRegisterButton() {
        await expect(this.registerButton).toBeVisible();
        await expect (this.registerButton).toHaveText('Register');
        await this.registerButton.click();
        console.log('Clicked on Register button successfully');
    }
    async clickShoppingCartButton() {
        await expect(this.shoppingCartButton).toBeVisible();
        await this.shoppingCartButton.click();
        console.log('Clicked on Shopping Cart button successfully');
    }
}
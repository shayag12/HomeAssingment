// RegistryPage.ts
import { Page, Locator,expect } from '@playwright/test';
import { logger } from '../loggerUtils';
import { randomFirstName, randomLastName, randomEmail, randomPassword } from '../config';  // Adjust path based on file structure

export class RegistryPage {
    readonly page: Page;
    readonly gendersButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registerButton: Locator;
    readonly registerdEmailHeader: Locator;
    readonly continueButton: Locator;
    readonly completedRegistarationMessage: Locator;
    readonly digitalDownloadsButon : Locator;

    constructor(page: Page) {
        this.page = page;
        this.gendersButton = page.locator('[name="Gender"]');
        this.firstName = page.locator('#FirstName'); 
        this.lastName = page.locator('#LastName');
        this.email = page.locator('#Email');
        this.password = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');
        this.registerButton = page.locator('#register-button');
        this.registerdEmailHeader = page.locator('.header-links .account');
        this.continueButton = page.locator('.button-1.register-continue-button');
        this.completedRegistarationMessage = page.locator('.result');
        this.digitalDownloadsButon = page.locator('text=Digital downloads');
    }

    async userRegister() {
        logger.info('User Registration has started');

        const count = await this.gendersButton.count();
        expect(count).toBe(2);

        const randomIndex = Math.floor(Math.random() * count);
        await this.gendersButton.nth(randomIndex).click();
        logger.info('Gender has been selected successfully');

        // Fill user first and last name
        await expect(this.firstName).toBeVisible();
        await this.firstName.fill(randomFirstName);
        await expect(this.lastName).toBeVisible();
        await this.lastName.fill(randomLastName);
        logger.info('First Name: ' + randomFirstName + ' Last Name: ' + randomLastName);

        // Fill user email
        await expect(this.email).toBeVisible();
        await this.email.fill(randomEmail);
        logger.info('Email: ' + randomEmail);

        // Fill user password and approve it
        await expect(this.password).toBeVisible();
        await this.password.fill(randomPassword);
        await this.confirmPassword.fill(randomPassword);
        logger.info('Password: ' + randomPassword);
    }

    async clickOnRegisterButton() {
        await expect(this.registerButton).toBeVisible();
        await this.registerButton.click();
        logger.info('Clicked on Register button successfully');
        await expect(this.completedRegistarationMessage).toBeVisible();
        await expect(this.completedRegistarationMessage).toHaveText('Your registration completed');
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
        logger.info('Clicked on Continue button successfully');
    }

    async validateRegisteredEmail() {
        await expect(this.registerdEmailHeader).toBeVisible();
        await expect(this.registerdEmailHeader).toHaveText(randomEmail);
        logger.info('User has been registered successfully');
    }

    async clickOnDigitalDownloadsButton() {
        await this.digitalDownloadsButon.first().click();
        logger.info('Clicked on Digital Downloads button successfully');
    }
}

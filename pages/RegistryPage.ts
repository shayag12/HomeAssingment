import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker'; // data faker libary

const randomFirstName = faker.person.firstName(); // random first name
const randomLastName = faker.person.lastName(); // random last name 
const randomEmail = faker.internet.email(); // random email
const randomPassword = faker.internet.password(); // random password

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

    constructor (page: Page) {
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
        console.log('User Registration has started');
        // await expect(this.gendersButton).toBeVisible();
        // Get genders count 
        const count = await this.gendersButton.count();
      
        // Ensure there are 2 gender buttons
        expect(count).toBe(2);
      
        // Generate a random number to select one of the buttons
        const randomIndex = Math.floor(Math.random() * count);
      
        // Click on one of the two genders avilaible
        await this.gendersButton.nth(randomIndex).click();
        console.log('gender has been selected successfully');
        // fill user first and last name
        await expect(this.firstName).toBeVisible();
        await this.firstName.fill(randomFirstName);
        await expect(this.lastName).toBeVisible();
        await this.lastName.fill(randomLastName);
        console.log('First Name: ' + randomFirstName + ' Last Name: ' + randomLastName);
        
        // fill user email
        await expect(this.email).toBeVisible();
        await this.email.fill(randomEmail);
        console.log('Email: ' + randomEmail);

        // fill user password and approve it 
        await expect(this.password).toBeVisible();
        await this.password.fill(randomPassword);
        await this.confirmPassword.fill(randomPassword);
        console.log('Password: ' + randomPassword);
      }
      async clickOnRegisterButton(){
        await expect(this.registerButton).toBeVisible();
        await this.registerButton.click();
        console.log('Clicked on Register button successfully');
        await expect(this.completedRegistarationMessage).toBeVisible();
        await expect(this.completedRegistarationMessage).toHaveText('Your registration completed'); // assert the message at the and of registry
        // continue 
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
        console.log('Clicked on Continue button successfully');
      } 
      async validateRegisteredEmail(){
        await expect(this.registerdEmailHeader).toBeVisible();
        await expect(this.registerdEmailHeader).toHaveText(randomEmail);
        console.log('User has been registered successfully');
      }
      async clickOnDigitalDownloadsButton(){
        // await expect(this.digitalDownloadsButon).toBeVisible();
        await this.digitalDownloadsButon.first().click();
        console.log('Clicked on Digital Downloads button successfully');
      }
}
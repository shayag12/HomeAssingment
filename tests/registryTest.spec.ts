import { test } from '../Fixtures/NewTestFixtures'; // Import the custom test
import * as allure from "allure-js-commons"; // Import Allure

test('New user registry and adding a product', async ({ page, homePage, registryPage,digitalDownloadsPage }) => {

  allure.description("The test case is to register a new user and add a product to the cart");
  allure.owner("Shay Agiv");
  allure.tags("entry", "development");
  allure.severity(allure.Severity.CRITICAL);

  // Step 1: Navigate to the page
  await allure.step('Navigate to the homepage', async () => {
    await page.goto('/');
  });

  // Step 2: Click the Register button
  await allure.step('Click Register button', async () => {
    await homePage.clickRegisterButton();
  });

  // Step 3: Perform user registration
  await allure.step('User registers', async () => {
    await registryPage.userRegister();
  });

  // Step 4: Click on the final Register button and continue
  await allure.step('Click on the Register button after filling registration details', async () => {
    await registryPage.clickOnRegisterButton();
  });

  // Step 5: Validate registered email
  await allure.step('Validate registered email', async () => {
    await registryPage.validateRegisteredEmail();
  });
 // Step 6: Click on digital downloads
  await allure.step('Enter digital downloads', async () => {
    await registryPage.clickOnDigitalDownloadsButton();
  });
 //step 7: Select a random item and add to cart
  await allure.step('pick random item and add to cart', async () => {
    await digitalDownloadsPage.selectRandomItem();
  });
 // Step 8: Click on shopping cart and validate the purchase
  await allure.step('clicks on shopping cart and validates the purchase', async () => {
   await homePage.clickShoppingCartButton();
  });

  // Step 9: Pause for debugging *optional*
  await allure.step('Pause for debugging', async () => {
    await page.pause();
  });

});

 // allure report generation
 // npx allure generate ./allure-results --clean
 //  npx allure open ./allure-report 


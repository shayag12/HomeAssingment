import { test as base } from '@playwright/test';
import { HomePage } from '../HomePage';
import { RegistryPage } from '../RegistryPage';
import { DigitalDownloadsPage } from '../DigitalDownloadsPage';
// Extend the base test to create custom fixtures
export type newPageFixtures = {
  homePage: HomePage;
  registryPage: RegistryPage;
  digitalDownloadsPage: DigitalDownloadsPage;
};

// Define the custom fixtures
const test = base.extend<newPageFixtures>({
  // The homePage fixture
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // The registryPage fixture
  registryPage: async ({ page }, use) => {
    await use(new RegistryPage(page));
  },

  digitalDownloadsPage: async ({ page }, use) => {
    await use(new DigitalDownloadsPage(page));
  },
});

// Export the custom test
export { test };

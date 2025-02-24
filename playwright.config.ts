import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: require.resolve('./globalsetup.ts'),  // Path to the global setup
  testDir: './tests',  // Directory where your test files are located

  /* Run tests in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'allure-playwright',

  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://demowebshop.tricentis.com/',

    /* Headless mode for running tests */
    headless: false,

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',

    /* Load the authentication state saved from globalSetup */
    storageState: 'LoginAuth.json',
  },

  /* Configure projects for major browsers */
  projects: [
    // Google Chrome
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'],  // Use Desktop Chrome settings
        channel: 'chrome',  // Use the system's installed Chrome browser
        baseURL: 'https://demowebshop.tricentis.com/',  // Base URL for tests
        storageState: 'LoginAuth.json',  // Load the saved authentication state
      },
    },
    
    // You can add other browser configurations if needed, like Firefox, Safari, etc.
    // Example for Chromium (already covered by the default 'Google Chrome' project):
    /*
    {
      name: 'Chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome', // Or any other channel you want, like 'msedge' or 'firefox'
      },
    }
    */

  ],

  /* Run your local dev server before starting the tests (optional) */
  // webServer: {
  //   command: 'npm run start',  // Command to start your server
  //   url: 'http://127.0.0.1:3000',  // The URL your app is running at
  //   reuseExistingServer: !process.env.CI,  // Reuse existing server during local runs
  // },
});


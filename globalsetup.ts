import { Browser, chromium, Page, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL; // get baseurl defined in config file
  const browser: Browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ baseURL });
  const page: Page = await context.newPage();

  await page.goto('/'); // Navigate to home page
  await page.context().storageState({ path: './LoginAuth.json' }); // Save auth state

  await browser.close(); // Ensure proper browser close
}

export default globalSetup;

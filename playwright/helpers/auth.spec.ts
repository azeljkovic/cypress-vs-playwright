// auth.spec.ts
// Generates the storageState.json file used by authentication helper.
// To make it work, testDir param in playwright.config.ts must be extended to this folder.
import { expect, test } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';


test('generate storageState.json for authentication helper', async ({ page }) => {
  await page.goto('/signin');
  await page.fill(loginSelectors.username, process.env.USERNAME);
  await page.fill(loginSelectors.password, process.env.PASSWORD);
  await page.click(loginSelectors.submit);
  await expect(page.locator(mainSelectors.usernameLabel)).toHaveText(`@${process.env.USERNAME}`);

  await page.context().storageState({ path: 'playwright/fixtures/storageState.json' });
});


import { test, expect, type Page } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('login via UI', async ({ page }) => {
  await page.fill(loginSelectors.username, process.env.USERNAME); // env file is defined in playwright.config.js
  await page.fill(loginSelectors.password, process.env.PASSWORD);
  await page.click(loginSelectors.submit);
  await expect(page.locator(mainSelectors.usernameLabel)).not.toBeVisible();
  // wait for 3 seconds to see what's happening in headed mode
  await page.waitForTimeout(3000);
});

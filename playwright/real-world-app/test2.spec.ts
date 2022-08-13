import { test, expect } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';

test.beforeEach(async ({ page }) => {
  await page.goto('/signin');
});

test('login via UI', async ({ page }) => {
  await page.fill(loginSelectors.username, process.env.USERNAME); // env file is defined in playwright.config.js
  await page.fill(loginSelectors.password, process.env.PASSWORD);
  await page.click(loginSelectors.submit);
  // assert
  await expect(page).toHaveURL('http://localhost:3000/');
  await expect(page.locator(mainSelectors.usernameLabel)).toHaveText(`@${process.env.USERNAME}`);
  // wait for 1 second to see what's happening in headed mode
  await page.waitForTimeout(1000);
});

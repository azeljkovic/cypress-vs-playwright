import { test, expect } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';
import notificationsObj from '../fixtures/notifications.json';

test.beforeEach(async ({ page }) => {
  await page.goto('/signin');
});

test('stub the response', async ({ page }) => {
  await page.route('**/notifications', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(notificationsObj),
    });
  });

  await page.fill(loginSelectors.username, process.env.USERNAME); // env file is defined in playwright.config.js
  await page.fill(loginSelectors.password, process.env.PASSWORD);
  await page.click(loginSelectors.submit);
  await expect(page.locator(mainSelectors.usernameLabel)).not.toBeVisible();

  await expect(page.locator(mainSelectors.notificationsBadge)).toHaveText('99+');

  // wait for 1 second to see what's happening in headed mode
  await page.waitForTimeout(1000);
});

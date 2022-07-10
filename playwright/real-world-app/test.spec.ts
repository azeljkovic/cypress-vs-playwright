import { test, expect, type Page } from '@playwright/test';

test('login via UI', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.fill('#username', 'Katharina_Bernier');
  await page.fill('#password', 's3cret');
  await page.click('[data-test="signin-submit"]');
  // wait for 3 seconds to see what's happening in headed mode
  await page.waitForTimeout(3000);
});

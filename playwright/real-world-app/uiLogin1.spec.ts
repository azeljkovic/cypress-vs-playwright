import { test } from '@playwright/test';

test('login via UI', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');
  await page.fill('#username', 'Katharina_Bernier');
  await page.fill('#password', 's3cret');
  await page.click('[data-test="signin-submit"]');
  // wait for 1 second to see what's happening in headed mode
  await page.waitForTimeout(1000);
});

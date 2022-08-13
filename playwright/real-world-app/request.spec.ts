import { test, expect } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';

test('should do a login API call', async ({ request }) => {
  // send login request
  const response = await request.post('http://localhost:3001/login', {
    data: {
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    },
  });
  let body = await response.json();
  expect(response.ok()).toBeTruthy();
  expect(body.user.email).toEqual(process.env.EMAIL);
});

test('make a transaction and wait for the response', async ({ page }) => {
  await page.goto('/signin');

  await page.fill(loginSelectors.username, process.env.USERNAME); // env file is defined in playwright.config.js
  await page.fill(loginSelectors.password, process.env.PASSWORD);
  await page.click(loginSelectors.submit);
  await expect(page.locator(mainSelectors.usernameLabel)).not.toBeVisible();

  await page.click(mainSelectors.newTransactionButton);
  await expect(page.locator(mainSelectors.usersList)).toHaveCount(4);
  await page.click(mainSelectors.user);
  await page.fill(mainSelectors.transactionAmount, '5');
  await page.fill(mainSelectors.transactionDescription, 'big bucks');
  await page.click(mainSelectors.submitTransactionButton);
  await page.waitForResponse('http://localhost:3001/transactions');

  await expect(page.locator(mainSelectors.transactionSuccessMessage)).toHaveText('Transaction Submitted!');

  // wait for 1 second1 to see what's happening in headed mode
  await page.waitForTimeout(1000);
});

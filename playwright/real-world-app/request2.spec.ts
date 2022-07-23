import { test, expect, type Page } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('make a transaction and wait for the response', async ({ page }) => {
    await page.fill(loginSelectors.username, process.env.USERNAME); // env file is defined in playwright.config.js
    await page.fill(loginSelectors.password, process.env.PASSWORD);
    await page.click(loginSelectors.submit);
    await expect(page.locator(mainSelectors.usernameLabel)).not.toBeVisible();

    await page.click('[data-test="nav-top-new-transaction"]');
    await expect(page.locator('[data-test="users-list"] > li')).toHaveCount(4);
    await page.click('[data-test="users-list"]:nth-child(2)');
    await page.fill('#amount', '5');
    await page.fill('#transaction-create-description-input', 'big bucks');
    await page.click('[data-test="transaction-create-submit-payment"]');
    await page.waitForResponse('http://localhost:3001/transactions');


    // wait for 3 seconds to see what's happening in headed mode
    await page.waitForTimeout(3000);
});

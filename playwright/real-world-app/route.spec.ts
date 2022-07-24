import { test, expect, type Page } from '@playwright/test';
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('stub the response', async ({ page }) => {
    await page.route('**/transactions', async route => {
        await route.fulfill({
            status: 500,
            contentType: 'application/json',
            body: '{"error": "Server error!"}',
        });
    });

    await page.fill(loginSelectors.username, process.env.USERNAME); // env file is defined in playwright.config.js
    await page.fill(loginSelectors.password, process.env.PASSWORD);
    await page.click(loginSelectors.submit);
    await expect(page.locator(mainSelectors.usernameLabel)).not.toBeVisible();

    await page.click('[data-test="nav-top-new-transaction"]');
    await expect(page.locator('[data-test="users-list"] > li')).toHaveCount(4);
    await page.click('[data-test="users-list"]:nth-child(2)');
    await page.fill('#amount', '5');
    await page.fill('#transaction-create-description-input', 'big bucks');
    await page.pause();
    await page.click('[data-test="transaction-create-submit-payment"]');

    await expect(page.locator('.MuiAlert-message')).toHaveText('Error occurred, please try again later!');

    // wait for 3 seconds to see what's happening in headed mode
    await page.waitForTimeout(3000);
});

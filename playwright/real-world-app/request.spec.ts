import { test, expect, request } from "@playwright/test";
import loginSelectors from '../fixtures/selectors/login.json';
import mainSelectors from '../fixtures/selectors/main.json';


test('should do a login API call', async ({ request }) => {
    // send login request
    const rsp = await request.post('http://localhost:3001/login', {
        data: {
            password: 's3cret',
            username: 'Katharina_Bernier',
        }
    })
    let body = await rsp.json();
    expect(rsp.ok()).toBeTruthy();
    expect(body.user.email).toEqual('Norene39@yahoo.com');
});


test('make a transaction and wait for the response', async ({ page }) => {
    await page.goto('/')

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

    await expect(page.locator('.MuiAlert-message')).toHaveText('Transaction Submitted!');


    // wait for 3 seconds to see what's happening in headed mode
    await page.waitForTimeout(3000);
});

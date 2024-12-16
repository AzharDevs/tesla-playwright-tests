const { test, expect } = require('@playwright/test');

test('Navigate to Tesla Website', async ({ page }) => {
    await page.goto('https://www.tesla.com', {
        waitUntil: 'load',
    });

    //Validates Page Title is 'Tesla'
    await expect(page).toHaveTitle(/Tesla/);
});
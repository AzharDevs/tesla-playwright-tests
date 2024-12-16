const { test, expect } = require('@playwright/test');

test('Navigate and Validate Tesla Homepage', async ({ page }) => {
    await page.goto('https://www.tesla.com', {
        waitUntil: 'load',
    });
    //--Validate Homepage Elements--//

    //Validates we've landed on the homepage correctly.
    await expect(page).toHaveURL("https://www.tesla.com")
    
    //Validates Page Title is 'Tesla'
    await expect(page).toHaveTitle(/Tesla/);

    //Validate Logo is on the page
    await expect(page.locator('.tds-site-logo-link')).toBeVisible();
});

test('Validate Tesla Nav bar', async({ page }) => {
    await page.goto('https://www.tesla.com', {
        waitUntil: 'load'
    });

    const navItems = [
        {selector: '#dx-nav-item--vehicles', expectedName: 'Vehicles'},
        {selector: '#dx-nav-item--energy', expectedName: 'Energy'},
        {selector: '#dx-nav-item--charging', expectedName: 'Charging'},
        {selector: '#dx-nav-item--discover', expectedName: 'Discover'},
        {selector: '#dx-nav-item--shop', expectedName: 'Shop'},
        {selector: '#dx-nav-item--we-robot', expectedName: 'We, Robot'},
    ]

    for(const item of navItems){
        //Grab page element with page locator
        const element = await page.locator(item.selector);

        //Validates nav item is present on the page
        await expect(element).toBeVisible();

        //Validates Nav text matches the expected name
        const extractedText = await element.innerText();
        expect(extractedText.trim()).toBe(item.expectedName);
    }
})
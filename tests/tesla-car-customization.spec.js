const { test, expect } = require('@playwright/test');

test('Navigate and Validate https://www.tesla.com Homepage', async ({ page }) => {
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

test('Validate https://www.tesla.com Nav Bar', async ({ page }) => {
    await page.goto('https://www.tesla.com', {
        waitUntil: 'load'
    });

    //--Validate Navbar Elements--//

    const navItems = [
        { selector: '#dx-nav-item--vehicles', expectedName: 'Vehicles' },
        { selector: '#dx-nav-item--energy', expectedName: 'Energy' },
        { selector: '#dx-nav-item--charging', expectedName: 'Charging' },
        { selector: '#dx-nav-item--discover', expectedName: 'Discover' },
        { selector: '#dx-nav-item--shop', expectedName: 'Shop' },
        { selector: '#dx-nav-item--we-robot', expectedName: 'We, Robot' },
    ]

    for (const item of navItems) {
        //Grab page element with page locator
        const element = await page.locator(item.selector);

        //Validates nav item is present on the page
        await expect(element).toBeVisible();

        //Validates Nav text matches the expected name
        const extractedText = await element.innerText();
        expect(extractedText.trim()).toBe(item.expectedName);
    }
})

test('Validate https://www.tesla.com Footer', async ({ page }) => {
    await page.goto('https://www.tesla.com', {
        waitUntil: 'load'
    });

    //--Validate Footer Elements--//


    const footerLinks = [
        { nth: 1, expectedName: 'Tesla © 2024', expectedHref: '/about' },
        { nth: 2, expectedName: 'Privacy & Legal', expectedHref: '/legal', },
        { nth: 3, expectedName: 'Vehicle Recalls', expectedHref: 'https://www.tesla.com/vin-recall-search', },
        { nth: 4, expectedName: 'Contact', expectedHref: '/contact', },
        { nth: 5, expectedName: 'News', expectedHref: '/blog' },
        { nth: 6, expectedName: 'Get Updates', expectedHref: '/updates', },
        { nth: 7, expectedName: 'Locations', expectedHref: '/findus/list', },
    ];

    for (const item of footerLinks) {
        const selector = `ul[data-region="footer"] > li:nth-of-type(${item.nth}) > a`;
        const element = await page.locator(selector);

        //Validate footer element is visible on page
        await expect(element).toBeVisible();

        //Validate extracted text matches expected text
        const extractedName = await element.innerText();
        expect(extractedName.trim()).toBe(item.expectedName);

        //Validate extracted href matches expected href
        const extractedHref = await element.getAttribute('href');
        expect(extractedHref).toBe(item.expectedHref);
    }
});
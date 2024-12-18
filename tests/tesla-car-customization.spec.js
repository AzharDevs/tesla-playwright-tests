const { test, expect } = require('@playwright/test');

test.describe.configure({ mode: 'parallel' });

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

test("End-to-End Model 3 customization flow from homepage", async ({ page }) =>{
    await page.goto('https://www.tesla.com', {
        waitUntil: 'load'
    });

     //--Validate E2E Homepage to Model 3 Customization--//

    //Ensures the order now button for Model 3 is visible
    const orderNowButton = page.locator('section.tcl-button-group[data-button-count="2"] a[title="Order Now"][href="/model3/design#overview"]').nth(0);
    await expect(orderNowButton).toBeVisible();
    
    //Click on the order now Model 3 Button
    await orderNowButton.click();

    //Go to Design Page
    await expect(page).toHaveURL("https://www.tesla.com/model3/design#overview");

    //--Begin Model 3 Customization--//

    const customizationSteps = [
        { labelFor: '$MT356-Long Range Rear-Wheel Drive', description: 'Model 3 Long Range Rear Wheel Drive' },
        { labelFor: 'PAINT_$PR01', description: 'Model 3 Ultra Red Color' },
        { labelFor: 'WHEELS_$W39S', description: 'Model 3 Nova Wheels' },
        { labelFor: 'INTERIOR_$IPW2', description: 'Model 3 White Interior' },
        { labelFor: '$APF2:base', description: 'Model 3 Full Self-Driving' },
        { labelFor: 'ACCESSORY:1457768-99-G', description:'Home Charger'},
        { labelFor: 'ACCESSORY:1974087-99-A', description: "All Weather Floor Liner"}
    ];
    
    for (const step of customizationSteps){
        const optionLabel = page.locator(`label[for="${step.labelFor}"]`);
        console.log(step.labelFor)
        //Validate Customizaiton Option is visible
        await expect(optionLabel).toBeVisible();

        //Click the selection option
        await optionLabel.click();

        console.log(`Selected: ${step.description}`);

    }

    // Validate "Order with Card" button visibility
    const orderWithCardButton = page.locator('button[title="Order with Card"]');
    await expect(orderWithCardButton).toBeVisible();

    // Click the "Order with Card" button
    await orderWithCardButton.click();
})
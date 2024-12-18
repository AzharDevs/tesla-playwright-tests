const { defineConfig } = require('@playwright/test');
const reportportal = require('@reportportal/agent-js-playwright');
require('dotenv').config();
const rpConfig = require('./reportportalconfig.json');

if (process.env.REPORTPORTAL_API_KEY) {
    rpConfig.apiKey = process.env.REPORTPORTAL_API_KEY;
} else {
    console.error('API key not found');
    process.exit(1);
}

module.exports = defineConfig({
    projects: [
        {
            name: 'firefox',
            use: { browserName: 'firefox' },
        },
        {
            name: 'webkit',
            use: { browserName: 'webkit' },
        },
    ],
    timeout: 60000, //Global timeout

    reporter: [
        ['line'],                     
        ['@reportportal/agent-js-playwright', rpConfig], 
    ],
});

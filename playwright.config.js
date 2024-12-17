const { defineConfig } = require('@playwright/test');
const reportportal = require('@reportportal/agent-js-playwright');

const rpConfig = require('./reportportalconfig.json');

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

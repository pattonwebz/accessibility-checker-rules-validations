const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
	username: "rulecheck",
	password: "5arWYMJtJnxTN5xpWjKBNS",
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://rulecheck.local",
    specPattern: "cypress/e2e/**/*.cy.(js|ts)",
    videosFolder: "cypress/videos",
    video: true,
    videoCompression: 32,
    screenshotsFolder: "cypress/screenshots",
    screenshotOnRunFailure: true,
    supportFile: "cypress/support/e2e.js",
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 2,
    experimentalRunAllSpecs: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

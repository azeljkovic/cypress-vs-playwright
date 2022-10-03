import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: true,
    defaultCommandTimeout: 5000,
    retries: 1,
    viewportHeight: 768,
    viewportWidth: 1024,
    videoCompression: 0,
    reporter: 'cypress-mochawesome-reporter',
    experimentalWebKitSupport: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});

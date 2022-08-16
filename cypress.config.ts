import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    watchForFileChanges: true,
    retries: 1,
    viewportHeight: 768,
    viewportWidth: 1024,
    videoCompression: 0,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

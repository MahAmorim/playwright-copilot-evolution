import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false, // Run in headed mode
    video: 'on', // Enable video recording for all tests
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          slowMo: 500, // Slow down execution by 500ms between actions
        },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          slowMo: 500, // Slow down execution by 500ms between actions
        },
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        launchOptions: {
          slowMo: 500, // Slow down execution by 500ms between actions
        },
      },
    },
  ],
});
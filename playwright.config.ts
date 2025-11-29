import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 2,
  // Test-level timeout (per test)
  timeout: 30_000, // 30 seconds
  // Global timeout (for the whole test run)
  globalTimeout: 60 * 60 * 1000, // 1 hour
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'],
  ['allure-playwright', {outputFoler: '../results/allure-results'}],
  ['list']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
   // baseURL: 'https://tutorialsninja.com/demo/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    //Timeout for individual actions (click, fill, etc.)
    actionTimeout: 10_000,
    //Allow tests to run against sites with invalid SSL certs
    ignoreHTTPSErrors: true,
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    //Run browser in headless mode (no visible window)
    headless: true,
    //Base URL for relative navigation
    baseURL: 'https://tutorialsninja.com/demo/',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    /* {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

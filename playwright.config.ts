import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  workers: 1, 

  use: {
    baseURL: 'https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/index.php',
    trace: 'on-first-retry'
  },
  testDir: './tests-e2e',
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
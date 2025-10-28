import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Добавляем эту строку для увеличения глобального тайм-аута до 60 секунд
  timeout: 60000, 

  use: {
    baseURL: 'https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/',
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
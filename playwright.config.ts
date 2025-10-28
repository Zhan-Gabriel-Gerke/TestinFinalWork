import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // URL вашего проекта (ЗАМЕНЕН)
  use: {
    baseURL: 'https://zhan-gabrielgerke24.thkit.ee/php/kaubadKaubagrupid/FinalProject/',
    trace: 'on-first-retry'
  },

  // Папка, где лежат тесты
  testDir: './tests-e2e',

  // Настройки отчета
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  
  // Запускать в браузере Chrome
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
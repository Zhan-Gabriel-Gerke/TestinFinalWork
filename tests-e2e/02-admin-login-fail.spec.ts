import { test, expect } from '@playwright/test';

test.describe('Administrator: Login failed', () => {
  test('vale parool ei lase sisse logida', async ({ page }) => {
    await page.goto('login2.php');

    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('wrongpassword');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    await expect(page).not.toHaveURL(/.*adminPanel.php/);
    await expect(page).toHaveURL(/.*login2.php/);
    await expect(page.locator('[name="logout"]')).not.toBeVisible();
  });
});
import { test, expect } from '@playwright/test';
test.describe('Administrator: Successful login', () => {
  test('admin saab sisse logida', async ({ page }) => {
    await page.goto('login2.php');

    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    await expect(page).toHaveURL(/.*adminPanel.php/);
    await expect(page.locator('[name="logout"]')).toBeVisible();
  });
}); 
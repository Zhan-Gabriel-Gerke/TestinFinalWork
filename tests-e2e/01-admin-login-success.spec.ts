import { test, expect } from '@playwright/test';
test.describe('Administrator: Login and Logout', () => {

  test('admin saab sisse logida ja seejärel välja logida', async ({ page }) => {
    await page.goto('login2.php');

    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    await expect(page).toHaveURL(/.*adminPanel.php/);
    const logoutButton = page.locator('[name="logout"]');
    await expect(logoutButton).toBeVisible();

    await logoutButton.click();

    await expect(page).toHaveURL(/.*login2.php/);

    await expect(logoutButton).not.toBeVisible();

    await expect(page.locator('[name="login"]')).toBeVisible();
    await expect(page.locator('[name="pass"]')).toBeVisible();
  });
});
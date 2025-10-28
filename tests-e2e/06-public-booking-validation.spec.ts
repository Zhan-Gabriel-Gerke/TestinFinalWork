import { test, expect } from '@playwright/test';
test.describe('Public form: Booking validation', () => {

  test('vorm ei luba broneerida ilma kliendi nimeta', async ({ page }) => {
    await page.goto('broneeringud.php');

    await page.locator('[name="kuupaev"]').fill('2025-11-15');
    await page.locator('[name="kellaaeg"]').fill('14:00');
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('2');
    await page.locator('[name="laud_id"]').selectOption({ index: 1 });

    await page.locator('[name="broneeringuLisamine"]').click();

    await expect(page).toHaveURL(/.*broneeringud.php/);
    await expect(page).not.toHaveURL(/.*success=1/);

    await expect(page.locator('div.success-message')).not.toBeVisible();
  });

  test('vorm ei luba broneerida ilma lauata', async ({ page }) => {
    await page.goto('broneeringud.php');

    await page.locator('[name="kliendi_nimi"]').fill(`Test Klient ${Date.now()}`);
    await page.locator('[name="kuupaev"]').fill('2025-11-16');
    await page.locator('[name="kellaaeg"]').fill('15:00');
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('1');

    await page.locator('[name="broneeringuLisamine"]').click();

    await expect(page).toHaveURL(/.*broneeringud.php/);
    await expect(page).not.toHaveURL(/.*success=1/);
    await expect(page.locator('div.success-message')).not.toBeVisible();
  });
});
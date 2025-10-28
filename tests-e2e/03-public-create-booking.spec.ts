// tests-e2e/03-public-create-booking.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Public form: Creating armor', () => {
  test('kasutaja saab broneeringu lisada', async ({ page }) => {
    await page.goto('broneeringud.php');

    const klientName = `Test Klient ${Date.now()}`;

    await page.locator('[name="kliendi_nimi"]').fill(klientName);
    await page.locator('[name="kuupaev"]').fill('2025-12-25');
    await page.locator('[name="kellaaeg"]').fill('19:30');

    // --- ИЗМЕНЕНИЕ ЗДЕСЬ (строки 15 и 16) ---
    // Меняем селектор с [name="..."] на #...
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 }); // Ждем ID
    await page.locator('#inimeste_arv').fill('2');                             // Заполняем по ID
    // --- КОНЕЦ ИЗМЕНЕНИЯ ---

    await page.locator('[name="laud_id"]').selectOption({ index: 1 });
    await page.locator('[name="broneeringuLisamine"]').click();

    await expect(page).toHaveURL(/.*broneeringud.php\?success=1/);

    const successMessage = page.locator('div.success-message');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Broneering on edukalt lisatud!');
  });
});
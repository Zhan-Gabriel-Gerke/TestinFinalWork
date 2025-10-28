// tests-e2e/05-admin-booking-edit.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Administrator: CRUD Reservations', () => {

  const klientNameA = `Test Klient ${Date.now()}`;
  const klientNameB = `Edited Klient ${Date.now()}`;

  test('admin saab broneeringut luua, muuta ja kustutada', async ({ page }) => {

    // --- 1. LOGIN ---
    await page.goto('login2.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();
    await expect(page).toHaveURL(/.*adminPanel.php/);

    // --- 2. CREATE ---
    await page.goto('broneeringud.php');
    await page.locator('[name="kliendi_nimi"]').fill(klientNameA);
    await page.locator('[name="kuupaev"]').fill('2026-10-10');
    await page.locator('[name="kellaaeg"]').fill('12:00');

    // --- ИЗМЕНЕНИЕ ЗДЕСЬ (строки 24 и 25) ---
    // Меняем селектор с [name="..."] на #...
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 }); // Ждем ID
    await page.locator('#inimeste_arv').fill('1');                             // Заполняем по ID
    // --- КОНЕЦ ИЗМЕНЕНИЯ ---

    await page.locator('[name="laud_id"]').selectOption({ index: 1 });
    await page.locator('[name="broneeringuLisamine"]').click();
    await expect(page.locator('div.success-message')).toBeVisible();

    // --- 3. READ / SEARCH ---
    await page.goto('adminPanel.php');
    await page.locator('[name="otsi"]').fill(klientNameA);
    await page.locator('[type="submit"][value="Otsi"]').click();

    const rowLocatorA = page.locator('tr', { hasText: klientNameA });
    await expect(rowLocatorA).toBeVisible();
    await expect(rowLocatorA).toContainText('2026-10-10');

    // --- 4. UPDATE ---
    await rowLocatorA.locator('a[href*="muudaid="]').click();

    const editForm = page.locator('form[action="adminPanel.php"][method="post"]');
    await expect(editForm).toBeVisible();

    // Меняем имя
    await editForm.locator('[name="kliendi_nimi"]').fill(klientNameB);

    // При редактировании тоже может быть нужно изменить селектор, если бы мы меняли количество людей.
    // Примерно так (но сейчас это не нужно, т.к. мы меняем только имя):
    // await expect(editForm.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    // await editForm.locator('#inimeste_arv').fill('3');

    await editForm.locator('[name="salvesta_muudatused"]').click();

    // Проверяем, что имя изменилось
    await expect(page.locator('tr', { hasText: klientNameA })).not.toBeVisible();
    const rowLocatorB = page.locator('tr', { hasText: klientNameB });
    await expect(rowLocatorB).toBeVisible();
    await expect(rowLocatorB).toContainText('2026-10-10');

    // --- 5. DELETE (Cleanup) ---
    page.on('dialog', dialog => dialog.accept());
    await rowLocatorB.locator('a[href*="kustutusid="]').click();

    await expect(rowLocatorB).not.toBeVisible();
  });
});
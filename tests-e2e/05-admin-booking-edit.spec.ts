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

    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('1');                             

    await page.locator('[name="laud_id"]').selectOption({ index: 1 });
    await page.locator('[name="broneeringuLisamine"]').click();
    await expect(page.locator('div.success-message')).toBeVisible();

    await page.goto('adminPanel.php');
    await page.locator('[name="otsi"]').fill(klientNameA);
    await page.locator('[type="submit"][value="Otsi"]').click();

    const rowLocatorA = page.locator('tr', { hasText: klientNameA });
    await expect(rowLocatorA).toBeVisible();
    await expect(rowLocatorA).toContainText('2026-10-10');

    await rowLocatorA.locator('a[href*="muudaid="]').click();

    const editForm = page.locator('form[action="adminPanel.php"][method="post"]');
    await expect(editForm).toBeVisible();

    await editForm.locator('[name="kliendi_nimi"]').fill(klientNameB);

    await editForm.locator('[name="salvesta_muudatused"]').click();

    await expect(page.locator('tr', { hasText: klientNameA })).not.toBeVisible();
    const rowLocatorB = page.locator('tr', { hasText: klientNameB });
    await expect(rowLocatorB).toBeVisible();
    await expect(rowLocatorB).toContainText('2026-10-10');

    page.on('dialog', dialog => dialog.accept());
    await rowLocatorB.locator('a[href*="kustutusid="]').click();

    await expect(rowLocatorB).not.toBeVisible();
  });
});
// tests-e2e/05-admin-booking-edit.spec.ts

import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION (CRUD - Create, Read, Update, Delete)
 * Initial State: User is not logged in.
 * Action: 1. Log in as admin. 2. Create a booking via broneeringud.php named "Client A". 3. Find this booking in adminPanel.php using search. 4. Click "Muuda". 5. Change the name to "Client B" and save. 6. Find the booking "Client B". 7. Click "Kustuta" and confirm.
 * Expectation: The booking is created, the name is updated to "Client B", and then the booking is successfully deleted from the list.
 */
test.describe('Administrator: Booking CRUD', () => { // Changed describe name

  const clientNameA = `Test Client A ${Date.now()}`; // Changed names
  const clientNameB = `Edited Client B ${Date.now()}`;

  test('admin can create, edit, and delete a booking', async ({ page }) => { // Changed test name

    // --- 1. LOGIN ---
    await page.goto('login2.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();
    await expect(page).toHaveURL(/.*adminPanel.php/);

    // --- 2. CREATE ---
    await page.goto('broneeringud.php');
    await page.locator('[name="kliendi_nimi"]').fill(clientNameA);
    await page.locator('[name="kuupaev"]').fill('2026-10-10');
    await page.locator('[name="kellaaeg"]').fill('12:00');
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('1');
    await page.locator('[name="laud_id"]').selectOption({ index: 1 });
    await page.locator('[name="broneeringuLisamine"]').click();
    await expect(page.locator('div.success-message')).toBeVisible();

    // --- 3. READ / SEARCH ---
    await page.goto('adminPanel.php');
    await page.locator('[name="otsi"]').fill(clientNameA);
    await page.locator('[type="submit"][value="Otsi"]').click();

    const rowLocatorA = page.locator('tr', { hasText: clientNameA });
    await expect(rowLocatorA).toBeVisible();
    await expect(rowLocatorA).toContainText('2026-10-10');

    // --- 4. UPDATE ---
    await rowLocatorA.locator('a[href*="muudaid="]').click();

    const editForm = page.locator('form[action="adminPanel.php"][method="post"]');
    await expect(editForm).toBeVisible();

    await editForm.locator('[name="kliendi_nimi"]').fill(clientNameB);
    await editForm.locator('[name="salvesta_muudatused"]').click();

    await expect(page.locator('tr', { hasText: clientNameA })).not.toBeVisible();
    const rowLocatorB = page.locator('tr', { hasText: clientNameB });
    await expect(rowLocatorB).toBeVisible();
    await expect(rowLocatorB).toContainText('2026-10-10');

    // --- 5. DELETE (Cleanup) ---
    page.on('dialog', dialog => dialog.accept());
    await rowLocatorB.locator('a[href*="kustutusid="]').click();

    await expect(rowLocatorB).not.toBeVisible();
  });
});
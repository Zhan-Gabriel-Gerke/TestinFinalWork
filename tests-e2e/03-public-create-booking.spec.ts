// tests-e2e/03-public-create-booking.spec.ts

import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION
 * Initial State: User is on the public booking page (broneeringud.php).
 * Action: User fills all form fields (name, date, time, number of people, table) and clicks "Lisa broneering".
 * Expectation: The page reloads with the "?success=1" parameter, and a success message is visible.
 */
test.describe('Public Form: Create Booking', () => { // Changed describe name
  test('user can add a booking', async ({ page }) => { // Changed test name
    await page.goto('broneeringud.php');

    const klientName = `Test Client ${Date.now()}`; // Changed name to English

    await page.locator('[name="kliendi_nimi"]').fill(klientName);
    await page.locator('[name="kuupaev"]').fill('2025-12-25');
    await page.locator('[name="kellaaeg"]').fill('19:30');

    // Using the ID selector as previously discussed
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('2');

    await page.locator('[name="laud_id"]').selectOption({ index: 1 });
    await page.locator('[name="broneeringuLisamine"]').click();

    await expect(page).toHaveURL(/.*broneeringud.php\?success=1/);

    const successMessage = page.locator('div.success-message');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText('Broneering on edukalt lisatud!');
  });
});
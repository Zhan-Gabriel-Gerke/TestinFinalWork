// tests-e2e/06-public-booking-validation.spec.ts

import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION
 * Initial State: User is on the public booking page (broneeringud.php).
 * Action: User attempts to submit the form without filling required fields (client name, table).
 * Expectation: Form submission is blocked (likely by HTML5 browser validation), the URL does not change, and no success message appears.
 */
test.describe('Public Form: Booking Validation', () => { // Changed describe name

  // Test 1: Empty Name
  /*
   * Initial State: User on broneeringud.php.
   * Action: Fills all fields except name, clicks "Lisa broneering".
   * Expectation: Form is not submitted, URL remains broneeringud.php.
   */
  test('form prevents booking without client name', async ({ page }) => { // Changed test name
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

  // Test 2: Table Not Selected
  /*
   * Initial State: User on broneeringud.php.
   * Action: Fills all fields except table (leaves "-- Vali laud --"), clicks "Lisa broneering".
   * Expectation: Form is not submitted, URL remains broneeringud.php.
   */
  test('form prevents booking without selecting a table', async ({ page }) => { // Changed test name
    await page.goto('broneeringud.php');

    await page.locator('[name="kliendi_nimi"]').fill(`Test Client ${Date.now()}`); // Changed name
    await page.locator('[name="kuupaev"]').fill('2025-11-16');
    await page.locator('[name="kellaaeg"]').fill('15:00');
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('1');
    // Table is intentionally not selected

    await page.locator('[name="broneeringuLisamine"]').click();

    await expect(page).toHaveURL(/.*broneeringud.php/);
    await expect(page).not.toHaveURL(/.*success=1/);
    await expect(page.locator('div.success-message')).not.toBeVisible();
  });
});
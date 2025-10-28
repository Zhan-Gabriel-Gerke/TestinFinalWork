// tests-e2e/04-admin-menu-crud.spec.ts
import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION (CRUD - Create, Read, Delete)
 * Initial State: User is not logged in.
 * Action: 1. Log in as admin. 2. Navigate to Menuu.php. 3. Add a new menu item with a unique name. 4. Find the item in the table. 5. Click the "Kustuta" button for that item and confirm.
 * Expectation: The menu item appears in the table after creation and disappears after deletion.
 */
test.describe('Administrator: Menu Item CRUD', () => { // Changed describe name

  test('admin can add and delete a menu item', async ({ page }) => { // Changed test name
    // Step 1: Login (Setup)
    await page.goto('login2.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();
    await expect(page).toHaveURL(/.*adminPanel.php/);

    // Step 2: Navigate to Menu page
    await page.goto('Menuu.php');

    const uniqueMenuItem = `Test Item ${Date.now()}`; // Changed name

    // Step 3: CREATE
    await page.locator('[name="nimetus"]#nimetus').fill(uniqueMenuItem);
    await page.locator('[name="hind"]#hind').fill('99.99');
    await page.locator('[name="kategooria"]#kategooria').fill('Test Category'); // Changed name
    await page.locator('[name="lisa_toit"]').click();

    // Step 4: READ (Verify creation)
    const rowLocator = page.locator('tr', { hasText: uniqueMenuItem });
    await expect(rowLocator).toBeVisible();
    await expect(rowLocator).toContainText('99.99');

    // Step 5: DELETE
    page.on('dialog', dialog => dialog.accept()); // Handle confirm dialog
    await rowLocator.locator('[type="submit"][value="Kustuta"]').click();

    // Step 6: Verify deletion
    await expect(rowLocator).not.toBeVisible();
  });
});
import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION
 * Initial State: User is on the login page (login2.php).
 * Action: User enters 'admin' and an incorrect password 'wrongpassword', then clicks "Logi sisse".
 * Expectation: No redirection occurs, the user remains on the login2.php page.
 */
test.describe('Administrator: Failed Login', () => { // Changed describe name
  test('incorrect password prevents login', async ({ page }) => { // Changed test name
    await page.goto('login2.php');

    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('wrongpassword');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    // Assert that the URL did NOT change to adminPanel.php
    await expect(page).not.toHaveURL(/.*adminPanel.php/);
    // Assert that the URL is still login2.php
    await expect(page).toHaveURL(/.*login2.php/);
    // Assert that the logout button is NOT visible
    await expect(page.locator('[name="logout"]')).not.toBeVisible();
  });
});
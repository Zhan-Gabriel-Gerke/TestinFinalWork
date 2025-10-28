import { test, expect } from '@playwright/test';

/*
 * TEST DESCRIPTION
 * Initial State: User is on the login page (login2.php).
 * Action: User enters correct 'admin'/'admin' credentials, clicks "Logi sisse", and then clicks "Logi välja".
 * Expectation: User successfully logs in (redirected to adminPanel.php, logout button is visible), and then successfully logs out (redirected back to login2.php, logout button is not visible).
 */
test.describe('Administrator: Login and Logout', () => {

  test('admin can log in and then log out', async ({ page }) => { // Changed test name to English
    // --- Step 1: Navigate to login page ---
    await page.goto('login2.php');

    // --- Step 2: Enter credentials and login ---
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    // --- Step 3: Verify successful login ---
    await expect(page).toHaveURL(/.*adminPanel.php/); // Check URL
    const logoutButton = page.locator('[name="logout"]'); // Find logout button
    await expect(logoutButton).toBeVisible(); // Assert it's visible

    // --- Step 4: Logout ---
    await logoutButton.click();

    // --- Step 5: Verify successful logout ---
    // Expect redirection back to the login page
    await expect(page).toHaveURL(/.*login2.php/);

    // Expect the logout button to NOT be visible anymore
    await expect(logoutButton).not.toBeVisible();

    // Optionally check if the login form is visible again
    await expect(page.locator('[name="login"]')).toBeVisible();
    await expect(page.locator('[name="pass"]')).toBeVisible();
  });
});
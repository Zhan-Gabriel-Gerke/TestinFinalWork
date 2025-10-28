import { test, expect } from '@playwright/test';

test.describe('Administrator: CRUD dishes in the menu', () => {
  
  test('admin saab lisada ja kustutada toitu', async ({ page }) => {
    //1: Login (Setup)
    await page.goto('login2.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();
    await expect(page).toHaveURL(/.*adminPanel.php/);

    //2: menu
    await page.goto('Menuu.php');

    const unikaalneToit = `Test Toit ${Date.now()}`;

    // 3: CREATE
    await page.locator('[name="nimetus"]#nimetus').fill(unikaalneToit);
    await page.locator('[name="hind"]#hind').fill('99.99');
    await page.locator('[name="kategooria"]#kategooria').fill('Test Kategooria');
    await page.locator('[name="lisa_toit"]').click();

    // 4: READ
    const rowLocator = page.locator('tr', { hasText: unikaalneToit });
    await expect(rowLocator).toBeVisible();
    await expect(rowLocator).toContainText('99.99');

    //5: DELETE
    page.on('dialog', dialog => dialog.accept());
    await rowLocator.locator('[type="submit"][value="Kustuta"]').click();

    await expect(rowLocator).not.toBeVisible();
  });
});
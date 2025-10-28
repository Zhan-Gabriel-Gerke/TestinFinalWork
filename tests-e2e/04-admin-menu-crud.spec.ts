import { test, expect } from '@playwright/test';

/*
 * ОПИСАНИЕ ТЕСТА (Admin CRUD)
 * Алгсеис: Админ не вошел.
 * Тегевус: 1. Логин. 2. Переход в Menuu.php. 3. Создание "Test Toit". 4. Поиск "Test Toit". 5. Удаление "Test Toit".
 * Оотус: Блюдо успешно создается и затем удаляется.
 */
test.describe('Administrator: CRUD dishes in the menu', () => {
  
  test('admin saab lisada ja kustutada toitu', async ({ page }) => {
    // Шаг 1: Логин (Setup)
    await page.goto('login2.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();
    await expect(page).toHaveURL(/.*adminPanel.php/);

    // Шаг 2: Переход на страницу Меню
    await page.goto('Menuu.php');

    const unikaalneToit = `Test Toit ${Date.now()}`;

    // Шаг 3: CREATE (Создание)
    await page.locator('[name="nimetus"]#nimetus').fill(unikaalneToit);
    await page.locator('[name="hind"]#hind').fill('99.99');
    await page.locator('[name="kategooria"]#kategooria').fill('Test Kategooria');
    await page.locator('[name="lisa_toit"]').click();

    // Шаг 4: READ (Проверка)
    const rowLocator = page.locator('tr', { hasText: unikaalneToit });
    await expect(rowLocator).toBeVisible();
    await expect(rowLocator).toContainText('99.99');

    // Шаг 5: DELETE (Удаление)
    // Подтверждаем alert
    page.on('dialog', dialog => dialog.accept());
    await rowLocator.locator('[type="submit"][value="Kustuta"]').click();

    // Шаг 6: Проверка удаления
    await expect(rowLocator).not.toBeVisible();
  });
});
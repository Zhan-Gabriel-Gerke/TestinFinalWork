// tests-e2e/07-admin-logout.spec.ts

import { test, expect } from '@playwright/test';

/*
 * ОПИСАНИЕ ТЕСТА (Основной функционал)
 * Алгсеис: Администратор вошел в систему (выполняем логин как часть теста).
 * Тегевус: Нажимает кнопку "Logi välja".
 * Оотус: Пользователя перенаправляет на страницу входа (login2.php), кнопка "Logi välja" больше не видна.
 */
test.describe('Administrator: Log out', () => {

  test('admin saab välja logida', async ({ page }) => {
    // --- Шаг 1: Логин (Setup) ---
    await page.goto('login2.php');
    await page.locator('[name="login"]').fill('admin');
    await page.locator('[name="pass"]').fill('admin');
    await page.locator('[type="submit"][value="Logi sisse"]').click();

    // Убедимся, что вошли - кнопка выхода видна
    const logoutButton = page.locator('[name="logout"]');
    await expect(logoutButton).toBeVisible();

    // --- Шаг 2: Выход ---
    await logoutButton.click();

    // --- Шаг 3: Проверка ---
    // Ожидаем, что нас перенаправило на страницу входа
    await expect(page).toHaveURL(/.*login2.php/);

    // Ожидаем, что кнопки выхода больше НЕТ
    await expect(logoutButton).not.toBeVisible();

    // Дополнительно можно проверить наличие формы входа
    await expect(page.locator('[name="login"]')).toBeVisible();
    await expect(page.locator('[name="pass"]')).toBeVisible();
  });
});
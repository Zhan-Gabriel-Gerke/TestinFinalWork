// tests-e2e/06-public-booking-validation.spec.ts

import { test, expect } from '@playwright/test';

/*
 * ОПИСАНИЕ ТЕСТА (Граничный случай - Валидация)
 * Алгсеис: Пользователь на публичной странице broneeringud.php.
 * Тегевус: 1. Пытается отправить форму с пустым именем клиента.
 * 2. Вводит имя, но пытается отправить без выбора стола.
 * Оотус: Форма не отправляется, URL не меняется, сообщение об успехе не появляется.
 * * Браузерная валидация (HTML5 'required') должна предотвратить отправку.
 */
test.describe('Public form: Booking validation', () => {

  test('vorm ei luba broneerida ilma kliendi nimeta', async ({ page }) => {
    await page.goto('broneeringud.php');

    // Заполняем все КРОМЕ имени
    await page.locator('[name="kuupaev"]').fill('2025-11-15');
    await page.locator('[name="kellaaeg"]').fill('14:00');
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('2');
    await page.locator('[name="laud_id"]').selectOption({ index: 1 });

    // Пытаемся отправить
    await page.locator('[name="broneeringuLisamine"]').click();

    // Проверяем, что остались на той же странице
    await expect(page).toHaveURL(/.*broneeringud.php/);
    await expect(page).not.toHaveURL(/.*success=1/);

    // Проверяем, что сообщения об успехе нет
    await expect(page.locator('div.success-message')).not.toBeVisible();
  });

  test('vorm ei luba broneerida ilma lauata', async ({ page }) => {
    await page.goto('broneeringud.php');

    // Заполняем все КРОМЕ стола (оставляем "-- Vali laud --")
    await page.locator('[name="kliendi_nimi"]').fill(`Test Klient ${Date.now()}`);
    await page.locator('[name="kuupaev"]').fill('2025-11-16');
    await page.locator('[name="kellaaeg"]').fill('15:00');
    await expect(page.locator('#inimeste_arv')).toBeVisible({ timeout: 10000 });
    await page.locator('#inimeste_arv').fill('1');
    // Не выбираем стол! await page.locator('[name="laud_id"]').selectOption({ index: 1 });

    // Пытаемся отправить
    await page.locator('[name="broneeringuLisamine"]').click();

    // Проверяем, что остались на той же странице
    await expect(page).toHaveURL(/.*broneeringud.php/);
    await expect(page).not.toHaveURL(/.*success=1/);
    await expect(page.locator('div.success-message')).not.toBeVisible();
  });
});
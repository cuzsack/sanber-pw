import { test, expect } from '@playwright/test';
import { config } from '../utils/config';
import { login } from '../resources/locators/login.locator';
import { addCategory } from '../resources/locators/category.locator';

test.describe('Login and Add Category', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.urlLogin);
    await login(page, config.usernameAdmin, config.passwordAdmin);
  });

  test('Add new Category', async ({ page }) => {
    await addCategory(page, 'testName1', 'testDescription1');
    await expect(page).toHaveURL(/categories/);
    await page.locator('#chakra-toast-manager-top-right').getByText('success');
    await expect(page.getByRole('listitem')).toContainText('item ditambahkan');
    await page.reload();
    await page.screenshot({
      path: "screenshot/screenshotcategoryPositive.png",
      fullPage: true,
    });
  });

  test('Add Category with empty fields', async ({ page }) => {
    await addCategory(page, '', '');
    await expect(page.getByText('"name" is not allowed to be')).toBeVisible();
    await page.reload();
    await page.screenshot({
      path: "screenshot/screenshotcategoryNegative.png",
      fullPage: true,
    });
  });

  test.afterEach(async ({ page }) => {
     await page.close();
  });  

});
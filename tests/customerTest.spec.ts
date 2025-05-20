import { test, expect } from '@playwright/test';
import { config } from '../utils/config';
import { login } from '../resources/locators/login.locator';
import { addCustomer } from '../resources/locators/customer.locator';

test.describe('Login and Add Customer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.urlLogin);
    await login(page, config.usernameAdmin, config.passwordAdmin);
  });

  test('Add new Customer', async ({ page }) => {
    await addCustomer(page, 'Name1', '08123456789', 'testAddress1', 'description1');
    await expect(page.getByText('item ditambahkan')).toBeVisible();
    await expect(page).toHaveURL(/customers/);
    await page.locator('#chakra-toast-manager-top-right').getByText('success');
    await page.reload();
    await page.screenshot({
      path: "screenshot/screenshotcategoryPositive.png",
      fullPage: true,
    });
  });

  test('Add Category with empty fields', async ({ page }) => {
    await addCustomer(page, '', '', '', '');
    await expect(page.getByText('"name" is not allowed to be')).toBeVisible();
    await page.reload();
    await page.screenshot({
      path: "screenshot/screenshotcategoryNegative.png",
      fullPage: true,
    });
  });
  
});
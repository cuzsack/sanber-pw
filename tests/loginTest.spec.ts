import { Page, test, expect } from "@playwright/test";
import { config } from "../utils/config";
import { login } from '../resources/locators/login.locator';

test.describe('Login', () => {
    test('Login flow', async ({page}) => {
        await page.goto(config.urlLogin);
        await login (page, (config.usernameAdmin), (config.passwordAdmin));
        await expect (page.getByRole('heading', { name: 'kasirAja' })).toBeVisible();
        await expect(page).toHaveURL(/dashboard/);
    })
})
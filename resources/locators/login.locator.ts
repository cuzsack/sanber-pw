import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[id="email"]');
    this.passwordInput = page.locator('[id="password"]');
    this.loginButton = page.getByRole('button', { name: 'login' });
  }

  async login(username: string | null, password: string | null): Promise<void> {
    await this.usernameInput.fill(username || '');
    await this.passwordInput.fill(password || '');
    await this.loginButton.click();
  }
}

export async function login(page: Page, username: string | null, password: string | null): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.login(username, password);
}
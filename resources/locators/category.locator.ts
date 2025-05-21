import { expect, type Locator, type Page } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;
  readonly navigateToCategory: Locator;
  readonly tambahCategory: Locator;
  readonly inputNamaCategory: Locator;
  readonly inputDeskripsiCategory: Locator;
  readonly simpanCategory: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigateToCategory = page.getByRole('link', { name: 'kategori' });
    this.tambahCategory = page.getByRole('link', { name: 'tambah' });
    this.inputNamaCategory = page.getByRole('textbox', { name: 'nama' });
    this.inputDeskripsiCategory = page.getByRole('textbox', { name: 'deskripsi' });
    this.simpanCategory = page.getByRole('button', { name: 'simpan' });
  }

  async addCategory(name: string | null, description: string | null): Promise<void> {
    await this.navigateToCategory.click();
    await this.tambahCategory.click();
    await this.inputNamaCategory.fill(name || '');
    await this.inputDeskripsiCategory.fill(description || '');
    await this.simpanCategory.click();
    await this.page.waitForTimeout(3000); 
  }
}

export async function addCategory(page: Page, name: string | null, description: string | null): Promise<void> {
  const dashboardPage = new CategoryPage(page);
  await dashboardPage.addCategory(name, description);
}
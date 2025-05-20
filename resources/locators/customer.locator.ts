import { expect, type Locator, type Page } from '@playwright/test';

export class CustomerPage {
  readonly page: Page;
  readonly navigateToCustomer: Locator;
  readonly tambahCustomer: Locator;
  readonly inputNamaCustomer: Locator;
  readonly inputPhoneCustomer: Locator;
  readonly inputAddressCustomer: Locator;
  readonly inputCustomerDescription: Locator;
  readonly simpanCustomer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigateToCustomer = page.getByRole('link', { name: 'pelanggan', exact: true })
    this.tambahCustomer = page.getByRole('link', { name: 'tambah' })
    this.inputNamaCustomer = page.getByRole('textbox', { name: 'nama' });
    this.inputPhoneCustomer = page.getByRole("textbox", { name: 'no.hp' });
    this.inputAddressCustomer = page.getByRole('textbox', { name: 'alamat' });
    this.inputCustomerDescription = page.getByRole('textbox', { name: 'keterangan' });
    this.simpanCustomer = page.getByRole('button', { name: 'simpan' });
  }

  async addCustomer(name: string | null, phone: string | null, address: string | null, description: string | null): Promise<void> {
    await this.navigateToCustomer.click();
    await this.tambahCustomer.click();
    await this.inputNamaCustomer.fill(name || '');
    await this.inputPhoneCustomer.fill(phone || '');
    await this.inputAddressCustomer.fill(address || '');
    await this.inputCustomerDescription.fill(description || '');
    await this.simpanCustomer.click();
  }
}

export async function addCustomer(page: Page, name: string | null, phone: string | null, address: string | null, description: string | null): Promise<void> {
  const dashboardPage = new CustomerPage(page);
  await dashboardPage.addCustomer(name, phone, address, description);
}
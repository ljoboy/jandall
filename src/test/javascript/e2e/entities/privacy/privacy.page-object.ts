import { element, by, ElementFinder } from 'protractor';

export class PrivacyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-privacy div table .btn-danger'));
  title = element.all(by.css('jhi-privacy div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PrivacyUpdatePage {
  pageTitle = element(by.id('jhi-privacy-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  bdateInput = element(by.id('field_bdate'));
  yearInput = element(by.id('field_year'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  getBdateInput(): ElementFinder {
    return this.bdateInput;
  }

  getYearInput(): ElementFinder {
    return this.yearInput;
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PrivacyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-privacy-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-privacy'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

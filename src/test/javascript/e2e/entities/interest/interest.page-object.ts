import { element, by, ElementFinder } from 'protractor';

export class InterestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-interest div table .btn-danger'));
  title = element.all(by.css('jhi-interest div h2#page-heading span')).first();
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

export class InterestUpdatePage {
  pageTitle = element(by.id('jhi-interest-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nameInput = element(by.id('field_name'));
  percentageInput = element(by.id('field_percentage'));

  extraInfoSelect = element(by.id('field_extraInfo'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput(): Promise<string> {
    return await this.nameInput.getAttribute('value');
  }

  async setPercentageInput(percentage: string): Promise<void> {
    await this.percentageInput.sendKeys(percentage);
  }

  async getPercentageInput(): Promise<string> {
    return await this.percentageInput.getAttribute('value');
  }

  async extraInfoSelectLastOption(): Promise<void> {
    await this.extraInfoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async extraInfoSelectOption(option: string): Promise<void> {
    await this.extraInfoSelect.sendKeys(option);
  }

  getExtraInfoSelect(): ElementFinder {
    return this.extraInfoSelect;
  }

  async getExtraInfoSelectedOption(): Promise<string> {
    return await this.extraInfoSelect.element(by.css('option:checked')).getText();
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

export class InterestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-interest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-interest'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

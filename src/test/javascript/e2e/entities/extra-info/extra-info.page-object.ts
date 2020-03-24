import { element, by, ElementFinder } from 'protractor';

export class ExtraInfoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-extra-info div table .btn-danger'));
  title = element.all(by.css('jhi-extra-info div h2#page-heading span')).first();
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

export class ExtraInfoUpdatePage {
  pageTitle = element(by.id('jhi-extra-info-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  bdateInput = element(by.id('field_bdate'));
  occupationInput = element(by.id('field_occupation'));
  bioInput = element(by.id('field_bio'));
  countryInput = element(by.id('field_country'));
  provinceInput = element(by.id('field_province'));
  cityInput = element(by.id('field_city'));
  addressInput = element(by.id('field_address'));
  titleInput = element(by.id('field_title'));
  mobileInput = element(by.id('field_mobile'));
  imgInput = element(by.id('file_img'));

  socialSelect = element(by.id('field_social'));
  privacySelect = element(by.id('field_privacy'));
  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBdateInput(bdate: string): Promise<void> {
    await this.bdateInput.sendKeys(bdate);
  }

  async getBdateInput(): Promise<string> {
    return await this.bdateInput.getAttribute('value');
  }

  async setOccupationInput(occupation: string): Promise<void> {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput(): Promise<string> {
    return await this.occupationInput.getAttribute('value');
  }

  async setBioInput(bio: string): Promise<void> {
    await this.bioInput.sendKeys(bio);
  }

  async getBioInput(): Promise<string> {
    return await this.bioInput.getAttribute('value');
  }

  async setCountryInput(country: string): Promise<void> {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput(): Promise<string> {
    return await this.countryInput.getAttribute('value');
  }

  async setProvinceInput(province: string): Promise<void> {
    await this.provinceInput.sendKeys(province);
  }

  async getProvinceInput(): Promise<string> {
    return await this.provinceInput.getAttribute('value');
  }

  async setCityInput(city: string): Promise<void> {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput(): Promise<string> {
    return await this.cityInput.getAttribute('value');
  }

  async setAddressInput(address: string): Promise<void> {
    await this.addressInput.sendKeys(address);
  }

  async getAddressInput(): Promise<string> {
    return await this.addressInput.getAttribute('value');
  }

  async setTitleInput(title: string): Promise<void> {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput(): Promise<string> {
    return await this.titleInput.getAttribute('value');
  }

  async setMobileInput(mobile: string): Promise<void> {
    await this.mobileInput.sendKeys(mobile);
  }

  async getMobileInput(): Promise<string> {
    return await this.mobileInput.getAttribute('value');
  }

  async setImgInput(img: string): Promise<void> {
    await this.imgInput.sendKeys(img);
  }

  async getImgInput(): Promise<string> {
    return await this.imgInput.getAttribute('value');
  }

  async socialSelectLastOption(): Promise<void> {
    await this.socialSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async socialSelectOption(option: string): Promise<void> {
    await this.socialSelect.sendKeys(option);
  }

  getSocialSelect(): ElementFinder {
    return this.socialSelect;
  }

  async getSocialSelectedOption(): Promise<string> {
    return await this.socialSelect.element(by.css('option:checked')).getText();
  }

  async privacySelectLastOption(): Promise<void> {
    await this.privacySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async privacySelectOption(option: string): Promise<void> {
    await this.privacySelect.sendKeys(option);
  }

  getPrivacySelect(): ElementFinder {
    return this.privacySelect;
  }

  async getPrivacySelectedOption(): Promise<string> {
    return await this.privacySelect.element(by.css('option:checked')).getText();
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class ExtraInfoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-extraInfo-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-extraInfo'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

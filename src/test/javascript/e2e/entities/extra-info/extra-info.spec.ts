import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ExtraInfoComponentsPage, ExtraInfoDeleteDialog, ExtraInfoUpdatePage } from './extra-info.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('ExtraInfo e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let extraInfoComponentsPage: ExtraInfoComponentsPage;
  let extraInfoUpdatePage: ExtraInfoUpdatePage;
  let extraInfoDeleteDialog: ExtraInfoDeleteDialog;
  const fileNameToUpload = 'logo-jhipster.png';
  const fileToUpload = '../../../../../../src/main/webapp/content/images/' + fileNameToUpload;
  const absolutePath = path.resolve(__dirname, fileToUpload);

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ExtraInfos', async () => {
    await navBarPage.goToEntity('extra-info');
    extraInfoComponentsPage = new ExtraInfoComponentsPage();
    await browser.wait(ec.visibilityOf(extraInfoComponentsPage.title), 5000);
    expect(await extraInfoComponentsPage.getTitle()).to.eq('jandallApp.extraInfo.home.title');
    await browser.wait(ec.or(ec.visibilityOf(extraInfoComponentsPage.entities), ec.visibilityOf(extraInfoComponentsPage.noResult)), 1000);
  });

  it('should load create ExtraInfo page', async () => {
    await extraInfoComponentsPage.clickOnCreateButton();
    extraInfoUpdatePage = new ExtraInfoUpdatePage();
    expect(await extraInfoUpdatePage.getPageTitle()).to.eq('jandallApp.extraInfo.home.createOrEditLabel');
    await extraInfoUpdatePage.cancel();
  });

  it('should create and save ExtraInfos', async () => {
    const nbButtonsBeforeCreate = await extraInfoComponentsPage.countDeleteButtons();

    await extraInfoComponentsPage.clickOnCreateButton();

    await promise.all([
      extraInfoUpdatePage.setBdateInput('2000-12-31'),
      extraInfoUpdatePage.setOccupationInput('occupation'),
      extraInfoUpdatePage.setBioInput('bio'),
      extraInfoUpdatePage.setCountryInput('country'),
      extraInfoUpdatePage.setProvinceInput('province'),
      extraInfoUpdatePage.setCityInput('city'),
      extraInfoUpdatePage.setAddressInput('address'),
      extraInfoUpdatePage.setTitleInput('title'),
      extraInfoUpdatePage.setMobileInput('+695 4 1 53025'),
      extraInfoUpdatePage.setImgInput(absolutePath),
      extraInfoUpdatePage.socialSelectLastOption(),
      extraInfoUpdatePage.privacySelectLastOption(),
      extraInfoUpdatePage.userSelectLastOption()
    ]);

    expect(await extraInfoUpdatePage.getBdateInput()).to.eq('2000-12-31', 'Expected bdate value to be equals to 2000-12-31');
    expect(await extraInfoUpdatePage.getOccupationInput()).to.eq('occupation', 'Expected Occupation value to be equals to occupation');
    expect(await extraInfoUpdatePage.getBioInput()).to.eq('bio', 'Expected Bio value to be equals to bio');
    expect(await extraInfoUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
    expect(await extraInfoUpdatePage.getProvinceInput()).to.eq('province', 'Expected Province value to be equals to province');
    expect(await extraInfoUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await extraInfoUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await extraInfoUpdatePage.getTitleInput()).to.eq('title', 'Expected Title value to be equals to title');
    expect(await extraInfoUpdatePage.getMobileInput()).to.eq('+695 4 1 53025', 'Expected Mobile value to be equals to +695 4 1 53025');
    expect(await extraInfoUpdatePage.getImgInput()).to.endsWith(fileNameToUpload, 'Expected Img value to be end with ' + fileNameToUpload);

    await extraInfoUpdatePage.save();
    expect(await extraInfoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await extraInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last ExtraInfo', async () => {
    const nbButtonsBeforeDelete = await extraInfoComponentsPage.countDeleteButtons();
    await extraInfoComponentsPage.clickOnLastDeleteButton();

    extraInfoDeleteDialog = new ExtraInfoDeleteDialog();
    expect(await extraInfoDeleteDialog.getDialogTitle()).to.eq('jandallApp.extraInfo.delete.question');
    await extraInfoDeleteDialog.clickOnConfirmButton();

    expect(await extraInfoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

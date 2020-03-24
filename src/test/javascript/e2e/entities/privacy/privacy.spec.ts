import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PrivacyComponentsPage, PrivacyDeleteDialog, PrivacyUpdatePage } from './privacy.page-object';

const expect = chai.expect;

describe('Privacy e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let privacyComponentsPage: PrivacyComponentsPage;
  let privacyUpdatePage: PrivacyUpdatePage;
  let privacyDeleteDialog: PrivacyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Privacies', async () => {
    await navBarPage.goToEntity('privacy');
    privacyComponentsPage = new PrivacyComponentsPage();
    await browser.wait(ec.visibilityOf(privacyComponentsPage.title), 5000);
    expect(await privacyComponentsPage.getTitle()).to.eq('jandallApp.privacy.home.title');
    await browser.wait(ec.or(ec.visibilityOf(privacyComponentsPage.entities), ec.visibilityOf(privacyComponentsPage.noResult)), 1000);
  });

  it('should load create Privacy page', async () => {
    await privacyComponentsPage.clickOnCreateButton();
    privacyUpdatePage = new PrivacyUpdatePage();
    expect(await privacyUpdatePage.getPageTitle()).to.eq('jandallApp.privacy.home.createOrEditLabel');
    await privacyUpdatePage.cancel();
  });

  it('should create and save Privacies', async () => {
    const nbButtonsBeforeCreate = await privacyComponentsPage.countDeleteButtons();

    await privacyComponentsPage.clickOnCreateButton();

    await promise.all([]);

    const selectedBdate = privacyUpdatePage.getBdateInput();
    if (await selectedBdate.isSelected()) {
      await privacyUpdatePage.getBdateInput().click();
      expect(await privacyUpdatePage.getBdateInput().isSelected(), 'Expected bdate not to be selected').to.be.false;
    } else {
      await privacyUpdatePage.getBdateInput().click();
      expect(await privacyUpdatePage.getBdateInput().isSelected(), 'Expected bdate to be selected').to.be.true;
    }
    const selectedYear = privacyUpdatePage.getYearInput();
    if (await selectedYear.isSelected()) {
      await privacyUpdatePage.getYearInput().click();
      expect(await privacyUpdatePage.getYearInput().isSelected(), 'Expected year not to be selected').to.be.false;
    } else {
      await privacyUpdatePage.getYearInput().click();
      expect(await privacyUpdatePage.getYearInput().isSelected(), 'Expected year to be selected').to.be.true;
    }

    await privacyUpdatePage.save();
    expect(await privacyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await privacyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Privacy', async () => {
    const nbButtonsBeforeDelete = await privacyComponentsPage.countDeleteButtons();
    await privacyComponentsPage.clickOnLastDeleteButton();

    privacyDeleteDialog = new PrivacyDeleteDialog();
    expect(await privacyDeleteDialog.getDialogTitle()).to.eq('jandallApp.privacy.delete.question');
    await privacyDeleteDialog.clickOnConfirmButton();

    expect(await privacyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

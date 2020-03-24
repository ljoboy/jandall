import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TeamComponentsPage, TeamDeleteDialog, TeamUpdatePage } from './team.page-object';
import * as path from 'path';

const expect = chai.expect;

describe('Team e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let teamComponentsPage: TeamComponentsPage;
  let teamUpdatePage: TeamUpdatePage;
  let teamDeleteDialog: TeamDeleteDialog;
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

  it('should load Teams', async () => {
    await navBarPage.goToEntity('team');
    teamComponentsPage = new TeamComponentsPage();
    await browser.wait(ec.visibilityOf(teamComponentsPage.title), 5000);
    expect(await teamComponentsPage.getTitle()).to.eq('jandallApp.team.home.title');
    await browser.wait(ec.or(ec.visibilityOf(teamComponentsPage.entities), ec.visibilityOf(teamComponentsPage.noResult)), 1000);
  });

  it('should load create Team page', async () => {
    await teamComponentsPage.clickOnCreateButton();
    teamUpdatePage = new TeamUpdatePage();
    expect(await teamUpdatePage.getPageTitle()).to.eq('jandallApp.team.home.createOrEditLabel');
    await teamUpdatePage.cancel();
  });

  it('should create and save Teams', async () => {
    const nbButtonsBeforeCreate = await teamComponentsPage.countDeleteButtons();

    await teamComponentsPage.clickOnCreateButton();

    await promise.all([
      teamUpdatePage.setNameInput('name'),
      teamUpdatePage.setAboutInput('about'),
      teamUpdatePage.setImgInput(absolutePath),
      teamUpdatePage.setCountryInput('country'),
      teamUpdatePage.setProvinceInput('province'),
      teamUpdatePage.setCityInput('city'),
      teamUpdatePage.setAddressInput('address'),
      teamUpdatePage.setLongitudeInput('5'),
      teamUpdatePage.setLatitudeInput('5'),
      teamUpdatePage.setLogoInput(absolutePath),
      teamUpdatePage.setCreatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      teamUpdatePage.setUpdatedAtInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      teamUpdatePage.socialSelectLastOption()
      // teamUpdatePage.membersSelectLastOption(),
    ]);

    expect(await teamUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await teamUpdatePage.getAboutInput()).to.eq('about', 'Expected About value to be equals to about');
    expect(await teamUpdatePage.getImgInput()).to.endsWith(fileNameToUpload, 'Expected Img value to be end with ' + fileNameToUpload);
    expect(await teamUpdatePage.getCountryInput()).to.eq('country', 'Expected Country value to be equals to country');
    expect(await teamUpdatePage.getProvinceInput()).to.eq('province', 'Expected Province value to be equals to province');
    expect(await teamUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await teamUpdatePage.getAddressInput()).to.eq('address', 'Expected Address value to be equals to address');
    expect(await teamUpdatePage.getLongitudeInput()).to.eq('5', 'Expected longitude value to be equals to 5');
    expect(await teamUpdatePage.getLatitudeInput()).to.eq('5', 'Expected latitude value to be equals to 5');
    expect(await teamUpdatePage.getLogoInput()).to.endsWith(fileNameToUpload, 'Expected Logo value to be end with ' + fileNameToUpload);
    expect(await teamUpdatePage.getCreatedAtInput()).to.contain('2001-01-01T02:30', 'Expected createdAt value to be equals to 2000-12-31');
    expect(await teamUpdatePage.getUpdatedAtInput()).to.contain('2001-01-01T02:30', 'Expected updatedAt value to be equals to 2000-12-31');

    await teamUpdatePage.save();
    expect(await teamUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await teamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Team', async () => {
    const nbButtonsBeforeDelete = await teamComponentsPage.countDeleteButtons();
    await teamComponentsPage.clickOnLastDeleteButton();

    teamDeleteDialog = new TeamDeleteDialog();
    expect(await teamDeleteDialog.getDialogTitle()).to.eq('jandallApp.team.delete.question');
    await teamDeleteDialog.clickOnConfirmButton();

    expect(await teamComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

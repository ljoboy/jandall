import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SocialComponentsPage, SocialDeleteDialog, SocialUpdatePage } from './social.page-object';

const expect = chai.expect;

describe('Social e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let socialComponentsPage: SocialComponentsPage;
  let socialUpdatePage: SocialUpdatePage;
  let socialDeleteDialog: SocialDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Socials', async () => {
    await navBarPage.goToEntity('social');
    socialComponentsPage = new SocialComponentsPage();
    await browser.wait(ec.visibilityOf(socialComponentsPage.title), 5000);
    expect(await socialComponentsPage.getTitle()).to.eq('jandallApp.social.home.title');
    await browser.wait(ec.or(ec.visibilityOf(socialComponentsPage.entities), ec.visibilityOf(socialComponentsPage.noResult)), 1000);
  });

  it('should load create Social page', async () => {
    await socialComponentsPage.clickOnCreateButton();
    socialUpdatePage = new SocialUpdatePage();
    expect(await socialUpdatePage.getPageTitle()).to.eq('jandallApp.social.home.createOrEditLabel');
    await socialUpdatePage.cancel();
  });

  it('should create and save Socials', async () => {
    const nbButtonsBeforeCreate = await socialComponentsPage.countDeleteButtons();

    await socialComponentsPage.clickOnCreateButton();

    await promise.all([
      socialUpdatePage.setFacebookInput('facebook'),
      socialUpdatePage.setTwitterInput('twitter'),
      socialUpdatePage.setLinkedInInput('linkedIn'),
      socialUpdatePage.setInstagramInput('instagram'),
      socialUpdatePage.setGithubInput('github'),
      socialUpdatePage.setGitlabInput('gitlab'),
      socialUpdatePage.setFlickrInput('flickr'),
      socialUpdatePage.setGmailInput('3w.r.s.4rr.ron@googlemail.com'),
      socialUpdatePage.setEmailInput('Uuk@B._.2Sx.TDwm2.jrF0bH._x.19MF'),
      socialUpdatePage.setWebsiteInput('website')
    ]);

    expect(await socialUpdatePage.getFacebookInput()).to.eq('facebook', 'Expected Facebook value to be equals to facebook');
    expect(await socialUpdatePage.getTwitterInput()).to.eq('twitter', 'Expected Twitter value to be equals to twitter');
    expect(await socialUpdatePage.getLinkedInInput()).to.eq('linkedIn', 'Expected LinkedIn value to be equals to linkedIn');
    expect(await socialUpdatePage.getInstagramInput()).to.eq('instagram', 'Expected Instagram value to be equals to instagram');
    expect(await socialUpdatePage.getGithubInput()).to.eq('github', 'Expected Github value to be equals to github');
    expect(await socialUpdatePage.getGitlabInput()).to.eq('gitlab', 'Expected Gitlab value to be equals to gitlab');
    expect(await socialUpdatePage.getFlickrInput()).to.eq('flickr', 'Expected Flickr value to be equals to flickr');
    expect(await socialUpdatePage.getGmailInput()).to.eq(
      '3w.r.s.4rr.ron@googlemail.com',
      'Expected Gmail value to be equals to 3w.r.s.4rr.ron@googlemail.com'
    );
    expect(await socialUpdatePage.getEmailInput()).to.eq(
      'Uuk@B._.2Sx.TDwm2.jrF0bH._x.19MF',
      'Expected Email value to be equals to Uuk@B._.2Sx.TDwm2.jrF0bH._x.19MF'
    );
    expect(await socialUpdatePage.getWebsiteInput()).to.eq('website', 'Expected Website value to be equals to website');

    await socialUpdatePage.save();
    expect(await socialUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await socialComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Social', async () => {
    const nbButtonsBeforeDelete = await socialComponentsPage.countDeleteButtons();
    await socialComponentsPage.clickOnLastDeleteButton();

    socialDeleteDialog = new SocialDeleteDialog();
    expect(await socialDeleteDialog.getDialogTitle()).to.eq('jandallApp.social.delete.question');
    await socialDeleteDialog.clickOnConfirmButton();

    expect(await socialComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});

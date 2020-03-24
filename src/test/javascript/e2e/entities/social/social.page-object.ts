import { element, by, ElementFinder } from 'protractor';

export class SocialComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-social div table .btn-danger'));
  title = element.all(by.css('jhi-social div h2#page-heading span')).first();
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

export class SocialUpdatePage {
  pageTitle = element(by.id('jhi-social-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  facebookInput = element(by.id('field_facebook'));
  twitterInput = element(by.id('field_twitter'));
  linkedInInput = element(by.id('field_linkedIn'));
  instagramInput = element(by.id('field_instagram'));
  githubInput = element(by.id('field_github'));
  gitlabInput = element(by.id('field_gitlab'));
  flickrInput = element(by.id('field_flickr'));
  gmailInput = element(by.id('field_gmail'));
  emailInput = element(by.id('field_email'));
  websiteInput = element(by.id('field_website'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFacebookInput(facebook: string): Promise<void> {
    await this.facebookInput.sendKeys(facebook);
  }

  async getFacebookInput(): Promise<string> {
    return await this.facebookInput.getAttribute('value');
  }

  async setTwitterInput(twitter: string): Promise<void> {
    await this.twitterInput.sendKeys(twitter);
  }

  async getTwitterInput(): Promise<string> {
    return await this.twitterInput.getAttribute('value');
  }

  async setLinkedInInput(linkedIn: string): Promise<void> {
    await this.linkedInInput.sendKeys(linkedIn);
  }

  async getLinkedInInput(): Promise<string> {
    return await this.linkedInInput.getAttribute('value');
  }

  async setInstagramInput(instagram: string): Promise<void> {
    await this.instagramInput.sendKeys(instagram);
  }

  async getInstagramInput(): Promise<string> {
    return await this.instagramInput.getAttribute('value');
  }

  async setGithubInput(github: string): Promise<void> {
    await this.githubInput.sendKeys(github);
  }

  async getGithubInput(): Promise<string> {
    return await this.githubInput.getAttribute('value');
  }

  async setGitlabInput(gitlab: string): Promise<void> {
    await this.gitlabInput.sendKeys(gitlab);
  }

  async getGitlabInput(): Promise<string> {
    return await this.gitlabInput.getAttribute('value');
  }

  async setFlickrInput(flickr: string): Promise<void> {
    await this.flickrInput.sendKeys(flickr);
  }

  async getFlickrInput(): Promise<string> {
    return await this.flickrInput.getAttribute('value');
  }

  async setGmailInput(gmail: string): Promise<void> {
    await this.gmailInput.sendKeys(gmail);
  }

  async getGmailInput(): Promise<string> {
    return await this.gmailInput.getAttribute('value');
  }

  async setEmailInput(email: string): Promise<void> {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput(): Promise<string> {
    return await this.emailInput.getAttribute('value');
  }

  async setWebsiteInput(website: string): Promise<void> {
    await this.websiteInput.sendKeys(website);
  }

  async getWebsiteInput(): Promise<string> {
    return await this.websiteInput.getAttribute('value');
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

export class SocialDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-social-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-social'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}

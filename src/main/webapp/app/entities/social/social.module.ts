import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JandallSharedModule } from 'app/shared/shared.module';
import { SocialComponent } from './social.component';
import { SocialDetailComponent } from './social-detail.component';
import { SocialUpdateComponent } from './social-update.component';
import { SocialDeleteDialogComponent } from './social-delete-dialog.component';
import { socialRoute } from './social.route';

@NgModule({
  imports: [JandallSharedModule, RouterModule.forChild(socialRoute)],
  declarations: [SocialComponent, SocialDetailComponent, SocialUpdateComponent, SocialDeleteDialogComponent],
  entryComponents: [SocialDeleteDialogComponent]
})
export class JandallSocialModule {}

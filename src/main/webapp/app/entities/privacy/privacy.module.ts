import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JandallSharedModule } from 'app/shared/shared.module';
import { PrivacyComponent } from './privacy.component';
import { PrivacyDetailComponent } from './privacy-detail.component';
import { PrivacyUpdateComponent } from './privacy-update.component';
import { PrivacyDeleteDialogComponent } from './privacy-delete-dialog.component';
import { privacyRoute } from './privacy.route';

@NgModule({
  imports: [JandallSharedModule, RouterModule.forChild(privacyRoute)],
  declarations: [PrivacyComponent, PrivacyDetailComponent, PrivacyUpdateComponent, PrivacyDeleteDialogComponent],
  entryComponents: [PrivacyDeleteDialogComponent]
})
export class JandallPrivacyModule {}

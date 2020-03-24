import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JandallSharedModule } from 'app/shared/shared.module';
import { ExtraInfoComponent } from './extra-info.component';
import { ExtraInfoDetailComponent } from './extra-info-detail.component';
import { ExtraInfoUpdateComponent } from './extra-info-update.component';
import { ExtraInfoDeleteDialogComponent } from './extra-info-delete-dialog.component';
import { extraInfoRoute } from './extra-info.route';

@NgModule({
  imports: [JandallSharedModule, RouterModule.forChild(extraInfoRoute)],
  declarations: [ExtraInfoComponent, ExtraInfoDetailComponent, ExtraInfoUpdateComponent, ExtraInfoDeleteDialogComponent],
  entryComponents: [ExtraInfoDeleteDialogComponent]
})
export class JandallExtraInfoModule {}

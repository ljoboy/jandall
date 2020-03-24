import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JandallSharedModule } from 'app/shared/shared.module';
import { TeamComponent } from './team.component';
import { TeamDetailComponent } from './team-detail.component';
import { TeamUpdateComponent } from './team-update.component';
import { TeamDeleteDialogComponent } from './team-delete-dialog.component';
import { teamRoute } from './team.route';

@NgModule({
  imports: [JandallSharedModule, RouterModule.forChild(teamRoute)],
  declarations: [TeamComponent, TeamDetailComponent, TeamUpdateComponent, TeamDeleteDialogComponent],
  entryComponents: [TeamDeleteDialogComponent]
})
export class JandallTeamModule {}

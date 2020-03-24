import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'social',
        loadChildren: () => import('./social/social.module').then(m => m.JandallSocialModule)
      },
      {
        path: 'extra-info',
        loadChildren: () => import('./extra-info/extra-info.module').then(m => m.JandallExtraInfoModule)
      },
      {
        path: 'interest',
        loadChildren: () => import('./interest/interest.module').then(m => m.JandallInterestModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('./privacy/privacy.module').then(m => m.JandallPrivacyModule)
      },
      {
        path: 'team',
        loadChildren: () => import('./team/team.module').then(m => m.JandallTeamModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JandallEntityModule {}

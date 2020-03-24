import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISocial, Social } from 'app/shared/model/social.model';
import { SocialService } from './social.service';
import { SocialComponent } from './social.component';
import { SocialDetailComponent } from './social-detail.component';
import { SocialUpdateComponent } from './social-update.component';

@Injectable({ providedIn: 'root' })
export class SocialResolve implements Resolve<ISocial> {
  constructor(private service: SocialService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISocial> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((social: HttpResponse<Social>) => {
          if (social.body) {
            return of(social.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Social());
  }
}

export const socialRoute: Routes = [
  {
    path: '',
    component: SocialComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.social.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SocialDetailComponent,
    resolve: {
      social: SocialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.social.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SocialUpdateComponent,
    resolve: {
      social: SocialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.social.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SocialUpdateComponent,
    resolve: {
      social: SocialResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.social.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

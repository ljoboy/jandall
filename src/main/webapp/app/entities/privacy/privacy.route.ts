import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPrivacy, Privacy } from 'app/shared/model/privacy.model';
import { PrivacyService } from './privacy.service';
import { PrivacyComponent } from './privacy.component';
import { PrivacyDetailComponent } from './privacy-detail.component';
import { PrivacyUpdateComponent } from './privacy-update.component';

@Injectable({ providedIn: 'root' })
export class PrivacyResolve implements Resolve<IPrivacy> {
  constructor(private service: PrivacyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPrivacy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((privacy: HttpResponse<Privacy>) => {
          if (privacy.body) {
            return of(privacy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Privacy());
  }
}

export const privacyRoute: Routes = [
  {
    path: '',
    component: PrivacyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.privacy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PrivacyDetailComponent,
    resolve: {
      privacy: PrivacyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.privacy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PrivacyUpdateComponent,
    resolve: {
      privacy: PrivacyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.privacy.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PrivacyUpdateComponent,
    resolve: {
      privacy: PrivacyResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.privacy.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExtraInfo, ExtraInfo } from 'app/shared/model/extra-info.model';
import { ExtraInfoService } from './extra-info.service';
import { ExtraInfoComponent } from './extra-info.component';
import { ExtraInfoDetailComponent } from './extra-info-detail.component';
import { ExtraInfoUpdateComponent } from './extra-info-update.component';

@Injectable({ providedIn: 'root' })
export class ExtraInfoResolve implements Resolve<IExtraInfo> {
  constructor(private service: ExtraInfoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExtraInfo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((extraInfo: HttpResponse<ExtraInfo>) => {
          if (extraInfo.body) {
            return of(extraInfo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExtraInfo());
  }
}

export const extraInfoRoute: Routes = [
  {
    path: '',
    component: ExtraInfoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.extraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExtraInfoDetailComponent,
    resolve: {
      extraInfo: ExtraInfoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.extraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExtraInfoUpdateComponent,
    resolve: {
      extraInfo: ExtraInfoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.extraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExtraInfoUpdateComponent,
    resolve: {
      extraInfo: ExtraInfoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jandallApp.extraInfo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

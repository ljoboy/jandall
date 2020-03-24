import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtraInfo } from 'app/shared/model/extra-info.model';

type EntityResponseType = HttpResponse<IExtraInfo>;
type EntityArrayResponseType = HttpResponse<IExtraInfo[]>;

@Injectable({ providedIn: 'root' })
export class ExtraInfoService {
  public resourceUrl = SERVER_API_URL + 'api/extra-infos';

  constructor(protected http: HttpClient) {}

  create(extraInfo: IExtraInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extraInfo);
    return this.http
      .post<IExtraInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(extraInfo: IExtraInfo): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extraInfo);
    return this.http
      .put<IExtraInfo>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExtraInfo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExtraInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(extraInfo: IExtraInfo): IExtraInfo {
    const copy: IExtraInfo = Object.assign({}, extraInfo, {
      bdate: extraInfo.bdate && extraInfo.bdate.isValid() ? extraInfo.bdate.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.bdate = res.body.bdate ? moment(res.body.bdate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((extraInfo: IExtraInfo) => {
        extraInfo.bdate = extraInfo.bdate ? moment(extraInfo.bdate) : undefined;
      });
    }
    return res;
  }
}

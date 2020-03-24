import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPrivacy } from 'app/shared/model/privacy.model';

type EntityResponseType = HttpResponse<IPrivacy>;
type EntityArrayResponseType = HttpResponse<IPrivacy[]>;

@Injectable({ providedIn: 'root' })
export class PrivacyService {
  public resourceUrl = SERVER_API_URL + 'api/privacies';

  constructor(protected http: HttpClient) {}

  create(privacy: IPrivacy): Observable<EntityResponseType> {
    return this.http.post<IPrivacy>(this.resourceUrl, privacy, { observe: 'response' });
  }

  update(privacy: IPrivacy): Observable<EntityResponseType> {
    return this.http.put<IPrivacy>(this.resourceUrl, privacy, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPrivacy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPrivacy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

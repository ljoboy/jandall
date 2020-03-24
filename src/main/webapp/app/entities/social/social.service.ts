import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISocial } from 'app/shared/model/social.model';

type EntityResponseType = HttpResponse<ISocial>;
type EntityArrayResponseType = HttpResponse<ISocial[]>;

@Injectable({ providedIn: 'root' })
export class SocialService {
  public resourceUrl = SERVER_API_URL + 'api/socials';

  constructor(protected http: HttpClient) {}

  create(social: ISocial): Observable<EntityResponseType> {
    return this.http.post<ISocial>(this.resourceUrl, social, { observe: 'response' });
  }

  update(social: ISocial): Observable<EntityResponseType> {
    return this.http.put<ISocial>(this.resourceUrl, social, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISocial>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISocial[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}

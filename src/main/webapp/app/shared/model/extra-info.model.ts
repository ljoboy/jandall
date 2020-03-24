import { Moment } from 'moment';
import { ISocial } from 'app/shared/model/social.model';
import { IPrivacy } from 'app/shared/model/privacy.model';
import { IUser } from 'app/core/user/user.model';
import { IInterest } from 'app/shared/model/interest.model';

export interface IExtraInfo {
  id?: number;
  bdate?: Moment;
  occupation?: string;
  bio?: string;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  title?: string;
  mobile?: string;
  imgContentType?: string;
  img?: any;
  social?: ISocial;
  privacy?: IPrivacy;
  user?: IUser;
  interests?: IInterest[];
}

export class ExtraInfo implements IExtraInfo {
  constructor(
    public id?: number,
    public bdate?: Moment,
    public occupation?: string,
    public bio?: string,
    public country?: string,
    public province?: string,
    public city?: string,
    public address?: string,
    public title?: string,
    public mobile?: string,
    public imgContentType?: string,
    public img?: any,
    public social?: ISocial,
    public privacy?: IPrivacy,
    public user?: IUser,
    public interests?: IInterest[]
  ) {}
}

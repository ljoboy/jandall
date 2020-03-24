import { Moment } from 'moment';
import { ISocial } from 'app/shared/model/social.model';
import { IUser } from 'app/core/user/user.model';

export interface ITeam {
  id?: number;
  name?: string;
  about?: string;
  imgContentType?: string;
  img?: any;
  country?: string;
  province?: string;
  city?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  logoContentType?: string;
  logo?: any;
  createdAt?: Moment;
  updatedAt?: Moment;
  social?: ISocial;
  members?: IUser[];
}

export class Team implements ITeam {
  constructor(
    public id?: number,
    public name?: string,
    public about?: string,
    public imgContentType?: string,
    public img?: any,
    public country?: string,
    public province?: string,
    public city?: string,
    public address?: string,
    public longitude?: number,
    public latitude?: number,
    public logoContentType?: string,
    public logo?: any,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public social?: ISocial,
    public members?: IUser[]
  ) {}
}

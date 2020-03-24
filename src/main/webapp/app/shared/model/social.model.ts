export interface ISocial {
  id?: number;
  facebook?: string;
  twitter?: string;
  linkedIn?: string;
  instagram?: string;
  github?: string;
  gitlab?: string;
  flickr?: string;
  gmail?: string;
  email?: string;
  website?: string;
}

export class Social implements ISocial {
  constructor(
    public id?: number,
    public facebook?: string,
    public twitter?: string,
    public linkedIn?: string,
    public instagram?: string,
    public github?: string,
    public gitlab?: string,
    public flickr?: string,
    public gmail?: string,
    public email?: string,
    public website?: string
  ) {}
}

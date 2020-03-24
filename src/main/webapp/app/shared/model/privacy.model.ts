export interface IPrivacy {
  id?: number;
  bdate?: boolean;
  year?: boolean;
}

export class Privacy implements IPrivacy {
  constructor(public id?: number, public bdate?: boolean, public year?: boolean) {
    this.bdate = this.bdate || false;
    this.year = this.year || false;
  }
}

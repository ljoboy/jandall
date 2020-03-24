import { IExtraInfo } from 'app/shared/model/extra-info.model';

export interface IInterest {
  id?: number;
  name?: string;
  percentage?: number;
  extraInfo?: IExtraInfo;
}

export class Interest implements IInterest {
  constructor(public id?: number, public name?: string, public percentage?: number, public extraInfo?: IExtraInfo) {}
}

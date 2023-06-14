import { IMatche } from './IMatche';

export interface IMathcheModel {
  findAll(): Promise<IMatche[]>,
}

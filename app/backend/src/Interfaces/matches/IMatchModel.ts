import { IMatche } from './IMatche';

export interface IMathcheModel {
  findAll(): Promise<IMatche[]>,
  findByQuery(q: string): Promise<IMatche[]>,
}

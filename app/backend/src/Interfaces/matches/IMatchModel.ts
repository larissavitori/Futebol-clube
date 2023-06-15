import { ID } from '../user';
import { IMatche } from './IMatche';

export interface IMathcheModel extends ICRUDModelUpdater<IMatche>{
  findAll(): Promise<IMatche[]>,
  findByQuery(q: string): Promise<IMatche[]>,
}

export interface ICRUDModelUpdater<T> {
  update(id: ID): Promise<T | null>,
}

export type ICRUDModel<T> = ICRUDModelUpdater<T>;

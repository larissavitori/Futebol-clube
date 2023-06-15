import { ID } from '../user';
import { IMatche } from './IMatche';

export interface IMathcheModel extends ICRUDModelUpdater{
  findAll(): Promise<IMatche[]>,
  findByQuery(q: string): Promise<IMatche[]>,
  findById(id: number, homeTeamGoals: number, awayTeamGoals:number): Promise<object>,
  create(data: IMatche): Promise<IMatche>,
}

export interface ICRUDModelUpdater {
  update(id: ID): Promise<number>,
}

export type ICRUDModel = ICRUDModelUpdater;

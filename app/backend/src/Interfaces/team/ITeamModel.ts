import { ITeam } from './Iteam';

export interface ITemModel {
  findAll(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>
}

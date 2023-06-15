import { IMatche } from '../Interfaces/matches/IMatche';
import { IMathcheModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private MatchModel: IMathcheModel,
  ) { }

  public async getAllMatche(): Promise<ServiceResponse<IMatche[]>> {
    const matche = await this.MatchModel.findAll();

    return { status: 'SUCCESSFUL', messager: matche };
  }

  public async getByQuery(q: string): Promise<ServiceResponse<IMatche[]>> {
    const match = await this.MatchModel.findByQuery(q);
    return { status: 'SUCCESSFUL', messager: match };
  }

  public async getMatchById(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ):Promise<object> {
    const match = await this.MatchModel.findById(id, homeTeamGoals, awayTeamGoals);
    return match;
  }

  public async update(id: number): Promise<object> {
    await this.MatchModel.update(id);
    return { messager: 'Finished' };
  }
}

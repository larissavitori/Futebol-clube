import { IMatche } from '../Interfaces/matches/IMatche';
import { IMathcheModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamsModel';

export default class MatchService {
  constructor(
    private MatchModel: IMathcheModel,
    private TeamsModel = new TeamModel(),
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

  public async update(id: number): Promise<ServiceResponse<object>> {
    await this.MatchModel.update(id);
    return { status: 'SUCCESSFUL', messager: { message: 'Finished' } };
  }

  public async createMach(book: IMatche): Promise<ServiceResponse<object>> {
    const newBook = await this.MatchModel.create(book);
    const teamAway = await this.TeamsModel.findById(book.awayTeamId);
    const teamHome = await this.TeamsModel.findById(book.homeTeamId);
    if (!teamAway || !teamHome) {
      return { status: 'NOT_FOUND', messager: { message: 'There is no team with such id!' } };
    }
    return { status: 'SUCCESSFUL', messager: newBook };
  }
}

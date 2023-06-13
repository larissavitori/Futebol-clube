import { ITeam } from '../Interfaces/team/Iteam';
import { ITemModel } from '../Interfaces/team/ITeamModel';
// import teamsModel from '../database/models/teamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private TeamsModel: ITemModel,
  ) { }

  public async getAllteams(): Promise<ServiceResponse<ITeam[]>> {
    const allteams = await this.TeamsModel.findAll();
    return { status: 'SUCCESSFUL', messager: allteams };
  }

  public async getteamById(id: number): Promise<ServiceResponse<ITeam>> {
    const teams = await this.TeamsModel.findById(id);
    if (!teams) return { status: 'NOT_FOUND', messager: { message: `Book ${id} not found` } };
    return { status: 'SUCCESSFUL', messager: teams };
  }
}

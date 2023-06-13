
import { ITeam } from '../Interfaces/team/Iteam';
import { ITemModel } from '../Interfaces/team/ITeamModel';
// import teamsModel from '../database/models/teamsModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse'; 

export default class TeamService { 
  constructor(
    private TeamsModel: ITemModel,
  ) { }

  public async getAllteams(): Promise<ServiceResponse<ITeam[]>> {
    const allBooks = await this.TeamsModel.findAll();
    return { status: 'SUCCESSFUL', messager: allBooks };
  }

  public async getteamById(id: number): Promise<ServiceResponse<ITeam>> {
    const book = await this.TeamsModel.findById(id);
    if (!book) return { status: 'NOT_FOUND', messager: { message: `Book ${id} not found` } };
    return { status: 'SUCCESSFUL', messager: book };
  }
}
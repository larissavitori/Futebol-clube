// import { Op } from 'sequelize';
import { ITeam } from '../Interfaces/team/Iteam';
import teamsModel from '../database/models/teamsModel';

export default class teamModel {
    private model = teamsModel;


  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const result = await this.model.findByPk(id);
    if (result == null) return null;

    const { team_name } = result;
    return {  id, teamName:team_name  };
  }

  async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result.map(({ id, team_name }) => (
      { id, teamName:team_name }
    ));
  }
}

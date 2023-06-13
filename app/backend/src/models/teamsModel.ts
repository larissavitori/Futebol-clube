// import { Op } from 'sequelize';
import { ITeam } from '../Interfaces/team/Iteam';
import teamsModel from '../database/models/teamsModel';

export default class teamModel {
    private model = teamsModel;


  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    const { team_name } = dbData;
    return {  id, teamName:team_name  };
  }

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, team_name }) => (
      { id, teamName:team_name }
    ));
  }
}

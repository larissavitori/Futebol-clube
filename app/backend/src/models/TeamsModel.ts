import { ITeam } from '../Interfaces/team/Iteam';
import teamsModel from '../database/models/teamsModel';

export default class teamModel {
  private model = teamsModel;

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const result = await this.model.findByPk(id);
    if (result == null) return null;

    const { teamName } = result;
    return { id, teamName };
  }

  async findAll(): Promise<ITeam[]> {
    const result = await this.model.findAll();
    return result.map(({ id, teamName }) => (
      { id, teamName }
    ));
  }
}

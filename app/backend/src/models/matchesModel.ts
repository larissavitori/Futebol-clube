import SequelizeMatches from '../database/models/matchesModel';
import { IMatche } from '../Interfaces/matches/IMatche';
import TeamModel from '../database/models/teamsModel';
// feito na monitoria com ajuda
export default class matcheModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatche[]> {
    const dbData = await this.model.findAll(
      {
        include: [
          {
            model: TeamModel,
            as: 'homeTeam',
            attributes: ['teamName'] }, {
            model: TeamModel,
            as: 'awayTeam',
            attributes: [
              'teamName',
            ],
          },
        ],
      },
    );
    return dbData;
  }
}

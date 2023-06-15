// import { Op } from 'sequelize';
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

  async findByQuery(q: string): Promise<IMatche[]> {
    const progress = q === 'true';
    return this.model.findAll({
      where: { inProgress: progress },
      include: [{ model: TeamModel,
        as: 'homeTeam',
        attributes: ['teamName'] }, {
        model: TeamModel,
        as: 'awayTeam',
        attributes: [
          'teamName',
        ],
      },
      ],
    });
  }

  async findById(id: IMatche['id']): Promise<IMatche | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;

    return dbData;
  }

  async update(id: IMatche['id']): Promise<IMatche | null> {
    const [affectedRows] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    if (affectedRows === 0) return null;

    return this.findById(id);
  }
}

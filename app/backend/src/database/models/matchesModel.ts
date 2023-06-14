import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import teamModel from './teamsModel';
import db from '.';

class SequelizeMatches extends Model<InferAttributes<SequelizeMatches>,
InferCreationAttributes<SequelizeMatches>> {
  declare id: CreationOptional<number>;

  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}
SequelizeMatches.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});
teamModel.belongsTo(SequelizeMatches, { foreignKey: 'homeTeamId', as: 'id' });
teamModel.belongsTo(SequelizeMatches, { foreignKey: 'awayTeamId', as: 'id' });

// SequelizeMatches.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// SequelizeMatches.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });
export default SequelizeMatches;

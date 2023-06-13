import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional,
  } from 'sequelize';
  import db from '.';
  
  class SequelizeTeams extends Model<InferAttributes<SequelizeTeams>,
  InferCreationAttributes<SequelizeTeams>> {
    declare id: CreationOptional<number>;
  
    declare team_name: string;
  }
  
  SequelizeTeams.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize: db,
    modelName: 'teams',
    timestamps: false,
  });
  
  export default SequelizeTeams;
  
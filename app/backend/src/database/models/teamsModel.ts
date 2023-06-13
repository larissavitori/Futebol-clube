import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        team_name: 'Avaí/Kindermann',
      },
      {
        id: 2,
        team_name: 'Bahia',
      },
      {
        id: 3,
        team_name: 'Botafogo',
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('teams', {});
  },
};

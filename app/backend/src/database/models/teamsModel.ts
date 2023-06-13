import { QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('teams', [
      {
        id: 1,
        teamName: 'Avaí/Kindermann',
      },
      {
        id: 2,
        teamName: 'Bahia',
      },
      {
        id: 3,
        teamName: 'Botafogo',
      },
    ], {
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('teams', {});
  },
};

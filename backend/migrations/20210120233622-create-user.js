'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER, 
        primary_key: true
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            args: true,
            msg: 'must be a valid email address',
          }
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: Sequelize.STRING,
      matches: {
        type: Sequelize.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('matches').split(';')
        },
        set(val) {
          this.setDataValue('matches',val.join(';'));
        },
      },
      type: {
        type: Sequelize.STRING, 
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
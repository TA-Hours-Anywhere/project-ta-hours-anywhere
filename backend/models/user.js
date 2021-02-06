'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Student, { foreign_key: 'user_id'});
      this.hasMany(models.Instructor, { foreign_key: 'user_id'});
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,
    matches: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('matches').split(';')
      },
      set(val) {
        this.setDataValue('matches',val.join(';'));
      },
    },
    role: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('platforms', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    }
    
  });
};
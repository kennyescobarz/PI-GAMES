const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      allowNull:false,
    },
    name:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    description:{
      type:DataTypes.STRING(10000),
      allowNull:false,
      
    },
    released:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    rating:{
      type:DataTypes.STRING,
      allowNull:false,
    }, 
    image:{
      type:DataTypes.STRING,
      allowNull:false,

    },

    createdVideoGame:{
      type: DataTypes.BOOLEAN,
      allowNull:true,
      defaultValue:true,
    }






  });
};

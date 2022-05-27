const { Router } = require('express');
const { Videogame, Genres, Platforms } = require('../db')
const { Sequelize, Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/games/name/:name', async (req, res) => {
  try{
  const { name } = req.params;

  if (name) {
    let videogame = await Videogame.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: {
        model: Genres,
        attributes: ["name", "id"],
        through: { attributes: [] },
      },
    });
    if (videogame) {
      return res.json(videogame);
    } else {
      return res.status(404).json({ message: "El videogame no fue encontrado." });
    }
  } else {
    return res.status(404).json({ message: "El videogame no fue encontrado." });
  }

} catch (err) {
  console.log(err);
}
});

router.get('/games/:id', async (req, res) => {
    try{
    const { id } = req.params;

    if (id) {
      let videogame = await Videogame.findOne({
        where: { id },
        include: [{
          model: Genres,
          attributes: ["name", "id"],
          through: { attributes: [] },
        },{
          model: Platforms,
          attributes: ["name", "id"],
          through: { attributes: [] },
        }],
      });
      if (videogame) {
        return res.json(videogame);
      } else {
        return res.status(404).json({ message: "El videogame no fue encontrado." });
      }
    } else {
      return res.status(404).json({ message: "El videogame no fue encontrado." });
    }

  } catch (err) {
    console.log(err);
  }
});




router.get('/games', async (req, res,) => {
    try {
        const { name } = req.query;
    
        if (name) {
          const videogame = await Videogame.findAll({
            where: { name: { [Op.iLike]: `%${name}%` } },
            include: {
              model: Genres,
              attributes: ["name", "id"],
              through: { attributes: [] },
            },
          });
          if (videogame) {
            res.json(videogame);
          } else {
            res.json({ mal: 404 });
          }
        } else {
          const allGames = await Videogame.findAll({
            include: {
              model: Genres,
              attributes: ["name", "id"],
              through: { attributes: [] },
            },
          });
          if (allGames) {
            return res.json(allGames);
          } else {
            return res.status(404).json({ message: "No se han encontrado games" });
          }
        }
      } catch(err){
          console.log(err);
      }
    });

    

    router.get('/genres', async (req, res) => {
        try {
            const allGenres = await Genres.findAll();
        
            if (allGenres) {
              res.json(allGenres);
            } else {
              res.status(404).json({ message: "No se han encontrado Generos" });
            }
          } catch (err) {
            console.log(err);
          };
        });
        router.get('/platforms', async (req, res) => {
          try {
              const allPlatforms = await Platforms.findAll();
          
              if (allPlatforms) {
                res.json(allPlatforms);
              } else {
                res.status(404).json({ message: "No se han encontrado plataformas." });
              }
            } catch (err) {
              console.log(err);
            };
          });
          
        




router.post('/videogames', async (req,res)=>{
    try {
        const {name, image, description, released, rating, platforms, genres} = req.body;
    
        if (name && image && description && released && rating && platforms && genres) {
          let maxId = await Videogame.findAll({
            attributes: [[Sequelize.fn('max', Sequelize.col('id')), 'maxId']],
            raw: true,
          });
          const [instance] = await Videogame.findOrCreate({
            where: {
              id : maxId[0].maxId + 1,
              name: name,
              image: image,
              description : description,
              released:released,
              rating:rating
            },
          });
    
          for (let i =  0; i < genres.length; i++){
            const genr_find = await Genres.findOne({ where: { id: parseInt(genres[i]) } });
            await instance.addGenres(genr_find, { through: "videogame_genero" });
          }

          for (let i =  0; i < platforms.length; i++){
            const plat_find = await Platforms.findOne({ where: { id: parseInt(platforms[i]) } });
            await instance.addPlatforms(plat_find, { through: "videogame_platform" });
          }
    
          return res.send("Video game creado exitosamente!");
        } else {
          return res
            .status(400)
            .json({ message: "No se ha podido crear el videogame." });
        }
      } catch (err) {
        console.log("Hubo un error en POST postVideogames.");
      };
    });
    

    router.delete('/games/:id', async(req,res)=>{
        const{id}= req.params;
        const videogameToDelete= await Videogame.findByPk(id);
        if(videogameToDelete){
            await videogameToDelete.destroy();
        }
    })
    
module.exports = router;

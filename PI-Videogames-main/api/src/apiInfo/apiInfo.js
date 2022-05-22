const {Videogame}=require("../db");
const axios = require("axios");

const apiInfo = async ()=> {
    try{
        const keepData= await axios.get(`https://api.rawg.io/api/games?key=f5a5a6d1a2994534b68a4d5485aab85e`)
        
        keepData.results.map(async(videogame) =>{
            const item = await axios.get("https://api.rawg.io/api/games/" + videogames.id + "?key=f5a5a6d1a2994534b68a4d5485aab85e")
            await Videogame.findOrCreate({
                where: {
                    id:videogame.id,
                    name:videogame.name,
                    image: videogame.background_image
                    ? videogame.background_image
                    :"Esta imagen no existe",
                    description:item.description,
                    released:videogame.released,
                    rating: videogame.rating,
                    genres: videogame.genres,
                    platforms: videogame.platforms,



                },
            });







        });
    } catch(err){
        console.log(err);
    }
};
module.exports = {apiInfo};
    

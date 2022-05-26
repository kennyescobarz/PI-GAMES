const {Videogame, Genres, Platforms}=require("../db");
const axios = require("axios");
const { json } = require("body-parser");

const apiInfo = async ()=> {
    try{
        let vids = await Videogame.findAll();
        if (vids.length == 0){
            let keepData= await axios.get(`https://api.rawg.io/api/games?key=d9d638532279421bbb9ee1cd69644d9f`).then(function (response) {
                return response.data;
            })

            while (keepData.next != null){
                keepData.results.map(async(videogame) =>{
                    try {
                        const item = await axios.get("https://api.rawg.io/api/games/" + videogame.id + "?key=d9d638532279421bbb9ee1cd69644d9f").then(function (response) {
                            return response.data;
                        })

                        await Videogame.findOrCreate({
                            where: {
                                id: videogame.id,
                                name:videogame.name,
                                image: videogame.image_background
                                ? videogame.image_background
                                :"Esta imagen no existe",
                                description:item.description,
                                released:videogame.released ? videogame.released : "",
                                rating: videogame.rating ? videogame.rating.toString() : "",
                                //genres: items_gens,
                                //platforms: JSON.stringify(videogame.platforms),
                                }
                            });
                        
                            const video_find = await Videogame.findOne({ where: { id: videogame.id } });
                            for (let i =  0; i < videogame.genres.length; i++){
                                await Genres.findOrCreate({
                                    where: {id:videogame.genres[i].id,name:videogame.genres[i].name}
                                    });

                                const genr_find = await Genres.findOne({ where: { id: videogame.genres[i].id } });
                                    
                                await video_find.addGenres(genr_find, { through: "videogame_genero" });
                                }
                            
                                for (let i =  0; i < videogame.platforms.length; i++){
                                    await Platforms.findOrCreate({
                                        where: {id:videogame.platforms[i].platform.id,name:videogame.platforms[i].platform.name}
                                        });
            
                                    const plat_find = await Platforms.findOne({ where: { id: videogame.platforms[i].platform.id } });
                                        
                                    await video_find.addPlatforms(plat_find, { through: "videogame_platform" });
                                    }
                    } catch (err) {
                        console.log(err)
                    }
                });

                keepData= await axios.get(keepData.next).then(function (response) {
                return response.data;
            })
            }
         
        }
    } catch(err){
        console.log(err);
    }
};
module.exports = {apiInfo};
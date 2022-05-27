import { GET_ALL_GAMES,GET_PLATFORMS,GET_GAME,GET_GAME_NAME,GET_GENRES,ORDER_NAME,ORDER_RATING,CREATE_GAME,FILTER_BY_GENRE,FILTER_CREATED,CLEAN_DETAILS,DELETE_GAME } from "../actions";

const initialState ={
    games:[],
    game:[],
    genres:[],
    platforms:[],
    gamescopy:[],
};

const rootReducer = (state= initialState,action)=>{
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                games:action.payload,
                gamescopy:action.payload
    }

    case GET_GAME:
        return{
            ...state,
            game:action.payload
        }

        case GET_GAME_NAME:
            if (action.payload != ""){
                return{
                    ...state,
                    gamescopy: action.payload.err? [{Error:'no videogame'}] : action.payload
                }
            }else{
                return{
                    ...state,
                    gamescopy: state.games
                }
            }

            case CREATE_GAME:
                return{
                    ...state,
                }

                case GET_GENRES:
                    return{
                        ...state,
                        genres:action.payload
                    }
                    case GET_PLATFORMS:
                        return{
                            ...state,
                            platforms:action.payload
                        }
                        case DELETE_GAME:
                            return{
                                ...state,
                                game:action.payload
                            
                            }

                            case ORDER_RATING :
                                const gamesAll= state.gamescopy
                                const orderR = action.payload === 'asc'?
                                gamesAll.sort((a, b) => (a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0))
                                : gamesAll.sort((a, b) => (a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0))
                                return{
                                    ...state,
                                    gamescopy:orderR
                                }

                                case ORDER_NAME:
                                    const allGame= state.gamescopy
                                    const orderA = action.payload==='asc'?
                                    allGame.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                                    : allGame.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
                                    return {
                                        ...state,
                                        gamescopy: orderA
                                    }
                                    case FILTER_BY_GENRE:
                                        const allGamesG = state.games
                                        let filteredByGenreAll =[]
                                        if(action.payload === "all"){
                                            filteredByGenreAll = allGamesG

                                        } else{
                                            //let filteredGenreApi = allGamesG.filter((e)=> e.genres?.includes(action.payload))
                                            let filteredGenreApi = allGamesG.filter(function(game) {
                                                return game.genres.some(function(filter) { // use some for Or, and every for And
                                                    console.log(filter.id)
                                                  return filter.id == action.payload;
                                                });
                                              });
                                            filteredByGenreAll= [...filteredGenreApi]

                                        }
                                        return{
                                            ...state,
                                            gamescopy: filteredByGenreAll
                                        }

                                        case FILTER_CREATED:
                                            const allGames= state.gamescopy
                                            const gameFilteredCreated = action.payload === 'created' ? allGames.filter(e => e.created_db):
                                            allGames.filter(e => !e.created_db)
                                            return{
                                                ...state,
                                                games: action.payload === 'all'? state.gamescopy
                                                : gameFilteredCreated.length ? gameFilteredCreated : [{Error:' No videogame'}]

                                            }
                                            case CLEAN_DETAILS:
                                                return{
                                                    ...state,
                                                    game:{}
                                                }

                                                default:
                                                    return {...state}



    
    


    };

};

export default rootReducer;
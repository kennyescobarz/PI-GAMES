
import axios from "axios";


import { GET_ALL_GAMES,GET_PLATFORMS,GET_GAME,GET_GAME_NAME,GET_GENRES,ORDER_ALFA,ORDER_RATING,CREATE_GAME,FILTER_BY_GENRE,FILTER_CREATED,CLEAN_DETAILS,DELETE_GAME } from "../actions";

const initialState ={
    games:[],
    game:[],
    genres:[],
    platforms:[],
};

const rootReducer = (state= initialState,action)=>{
    switch(action.type){
        case GET_ALL_GAMES:
            return{
                ...state,
                games:action.payload
    }

    case GET_GAME:
        return{
            ...state,
            game:action.payload
        }

        case GET_GAME_NAME:
            return{
                ...state,
                games: action.payload.err? [{Error:'no videogame'}] : action.payload
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
                                const gamesAll= state.games
                                const orderR = action.payload === 'asc'?
                                gamesAll.sort((a, b) => (a.rating > b.rating ? 1 : a.rating < b.rating ? -1 : 0))
                                : gamesAll.sort((a, b) => (a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0))
                                return{
                                    ...state,
                                    games:orderR
                                }

                                case ORDER_ALFA:
                                    const allGame= state.games
                                    const orderA = action.payload==='asc'?
                                    allGame.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
                                    : allGame.sort((a, b) => (a.name > b.name ? -1 : a.name < b.name ? 1 : 0))
                                    return {
                                        ...state,
                                        games: orderA
                                    }
                                    case FILTER_BY_GENRE:
                                        const allGenres = state.gamescopy
                                        let filteredByGenreAll =[]
                                        if(action.payload === "all"){
                                            filteredByGenreAll = allGenres

                                        } else{
                                            let filteredGenreApi = allGenres.filter((e)=> e.genres?.includes(action.payload))
                                            filteredByGenreAll= [...filteredGenreApi]

                                        }
                                        return{
                                            ...state,
                                            games: filteredByGenreAll.length? filteredByGenreAll : [{Error:'No videogames'}]
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
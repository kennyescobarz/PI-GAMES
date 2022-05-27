import axios from "axios";
export const GET_PLATFORMS ='GET_PLATFORMS';
export const GET_ALL_GAMES ='GET_ALL_GAMES';
export const GET_GAME = 'GET_GAME';
export const GET_GAME_NAME ='GET_GAME_NAME';
export const GET_GENRES = 'GET_GENRES';
export const ORDER_NAME = 'ORDER_NAME';
export const ORDER_RATING = 'ORDER_RATING';
export const DELETE_GAME = 'DELETE_GAME';
export const CREATE_GAME = 'CREATE_GAME';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE';
export const CLEAN_DETAILS = 'CLEAN_DETAILS';



export function getAllGames(){
    return async function(dispatch){
        const json= await axios.get("http://localhost:3001/games")
        return dispatch({type:'GET_ALL_GAMES', payload : json.data})
    }
}

export function getGame(id){
    return async function (dispatch){
        const json=await axios.get(`http://localhost:3001/games/${id}`)
        return dispatch ({type:"GET_GAME", payload: json.data})
    }
}

export function getGameName(name) {
    if (name != ""){
        return async function (dispatch){
            const json = await axios.get (`http://localhost:3001/games/name/${name}`)
            return dispatch ({type:'GET_GAME_NAME', payload: json.data})
        }
    }else{
        return{
            type:'GET_GAME_NAME',
            payload:name
        }
    }

}

export function getGenres(){
    return async function (dispatch){
        const response = await axios.get(`http://localhost:3001/genres`);
        return dispatch({type:'GET_GENRES', payload: response.data})
    }
}

export function getPlatforms(){
    return async function(dispatch){
        const json = await axios.get(`http://localhost:3001/platforms`);
        return dispatch({type:'GET_PLATFORMS', payload: json.data})
    }
}


export function createGame(payload){
    console.log(payload)
    return async function(dispatch){
        const json= await axios.post(`http://localhost:3001/videogames`,payload);
        return json;

    }
}


export function deleteGame (id){
    return async function (dispatch){
        const json  = await axios.delete(`http://localhost:3001/vidogames/${id}`)
        return dispatch({type:'DELTE_GAME', payload: json.data})
    }
}

export function orderName(payload){
    return{
        type:'ORDER_NAME',
        payload
    }
}

export function filterCreated (payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}

export function filterGenre(payload){
    console.log("AJAKA",payload)
    return {
        type:'FILTER_BY_GENRE',
        payload
    }
}

export function orderRating(payload){
    return{
        type:'ORDER_RATING',
        payload
    }
}

export function cleanDetails(payload){
    return{
        type:'CLEAN_DETAILS',
        payload
    }
}


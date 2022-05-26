import axios from "axios";


export function getAllGames(){
    return async function(dispatch){
        console.log("AJAMMM 11")
        const json= await axios.get("http://localhost:3001/games")
        return dispatch({type:'GET_ALL_GAMES', payload : json.data})
    }
}

export function getGame(id){
    return async function (dispatch){
        const json=await axios.get(`http://localhost:3001/videogames/${id}`)
        return dispatch ({type:"GET_GAME", payload: json.data})
    }
}

export function getGameName(name) {
    return async function (dispatch){
        const json = await axios.get (`http://localhost:3001/videogames?name=${name}`)
        return dispatch ({type:'GET_GAME_NAME', payload: json.data})
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
        const json = await axios.get(`http://localhost:3001/videogames/platforms`);
        return dispatch({type:'GET_PLATFORMS', payload: json.data})
    }
}


export function createGame(payload){
    return async function(dispatch){
        const json= await axios.get(`http://localhost:3001/videogames`,payload);
        return json;

    }
}


export function deleteGame (id){
    return async function (dispatch){
        const json  = await axios.delete(`http://localhost:3001/vidogames/${id}`)
        return dispatch({type:'DELTE_GAME', payload: json.data})
    }
}

export function orderAlfa(payload){
    return{
        type:'ORDER_ALFA',
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
    return{
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


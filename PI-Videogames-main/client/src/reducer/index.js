
const initialState = {
    games: [],
}

const reducer = function (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_GAMES':
            return {
                ...state,
                games: action.payload,
            }
            default:
                return state
        }
    };
    export default reducer;
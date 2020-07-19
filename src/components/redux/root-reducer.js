import { combineReducers } from 'redux';
import { watchListReducer } from './watchlist/watchlist.reducer.js';



const rootReducer = combineReducers({
    rootWatchListReducer: watchListReducer
})

export default rootReducer
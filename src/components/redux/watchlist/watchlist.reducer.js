import watchListItemsTypes from './watchlist.types';

const INITIAL_STATE = {
    watchListItems: [],
    numberOfWatchListItems: 0,
    watchListOpen: false
}


export const watchListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case watchListItemsTypes.TOGGLE_WATCH_LIST:
            return {
                ...state,
                watchListOpen: !state.watchListOpen
            }
        case watchListItemsTypes.ADD_MOVIE_TO_WATCH_LIST:
            return {
                ...state,
                watchListItems: [...state.watchListItems, action.payload]
            }
        case watchListItemsTypes.REMOVE_MOVIE_FROM_WATCH_LIST:
            return {
                ...state,
                watchListItems: [...state.watchListItems, action.payload]
            }
        case watchListItemsTypes.TOTAL_NUMBER_OF_MOVIES:
            return {
                ...state,
                numberOfWatchListItems: state.watchListItem.length
            }
    }
    return state
}
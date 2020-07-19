import watchListItemsTypes from './watchlist.types';




export const action_toggle_watch_list = () => ({
    type: watchListItemsTypes.TOGGLE_WATCH_LIST
})
export const action_add_movie_to_watch_list = (movies) => ({
    type: watchListItemsTypes.ADD_MOVIE_TO_WATCH_LIST,
    payload: movies
})
export const action_remove_movie_from_watch_list = (movies) => ({
    type: watchListItemsTypes.REMOVE_MOVIE_FROM_WATCH_LIST,
    payload: movies
})
export const action_update_total_number_of_movies = () => ({
    type: watchListItemsTypes.TOTAL_NUMBER_OF_MOVIES,
})
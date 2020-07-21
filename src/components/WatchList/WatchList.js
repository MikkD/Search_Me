import React, { Component } from 'react'
import './WatchList.css'
import WatchListHeader from './WatchListHeader/WatchListHeader';

export class WatchList extends Component {

    render() {
        const { watchListIsOpen, watchListMovies } = this.props
        console.log('WatchList.js Trigerred')
        return (
            <React.Fragment >
                <div className={watchListIsOpen ? "watch-list-overlay slide-in" : "watch-list-overlay"}>
                    < div className="space-wrapper">
                        <WatchListHeader
                            watchListMovies={watchListMovies}
                            filterWatchList={this.props.filterWatchList} />
                        {watchListMovies.map(movie => {
                            return (
                                <React.Fragment>
                                    <div className="watch-list-body" key={movie.imdbID}>
                                        <a onClick={() => this.props.hiddenAccordionHandler(movie.imdbID)}
                                            className="open-accordion" id={movie.imdbID}>
                                            <div className="watch-list-item-container">
                                                <p >{movie.Title}</p>
                                                <p className="invisible">{movie.Year}</p>
                                                <p className="invisible">{movie.Director}</p>
                                                <p className="invisible">{movie.Country}</p>
                                                <p className="invisible">{movie.Genre}</p>
                                            </div>
                                        </a>
                                        <div
                                            className={movie.hiddenAccordionClicked ? "hidden-accordion clicked" : "hidden-accordion"}
                                            id={movie.imdbID}>
                                            <div className={movie.hiddenAccordionClicked ?
                                                "hidden-accordion-padding" : "hidden-accordion-padding fade-out"}>
                                                < div className="flex-accordion-img">
                                                    <img src={movie.Poster}></img>
                                                </div>
                                                <div className="flex-accordion-body flex-grow-big">
                                                    <p><span>Synopsis:</span><br />{movie.Plot}</p>
                                                    <p><span>Director:</span><br />{movie.Director}</p>
                                                    <p><span>Actors:</span><br />{movie.Actors}</p>
                                                    <p><span>Genre:</span><br />{movie.Genre}</p>
                                                    <p><span>Duration:</span><br />{movie.Runtime}</p>
                                                    <a
                                                        onClick={() => this.props.watchListHandler(movie)}
                                                        className="off-watch-list-button">
                                                        Remove from Watchlist
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                        }
                        <div className="watch-list-footer">

                        </div>

                    </div>
                </div>
            </React.Fragment >
        )
    }
}
export default WatchList

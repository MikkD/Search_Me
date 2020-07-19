import React, { Component } from 'react'
import './WatchList.css'
import WatchListHeader from './WatchListHeader/WatchListHeader';
import { connect } from 'react-redux';
import { action_toggle_watch_list } from '../redux/watchlist/watchlist.action';


export class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.hiddenAccordionRef = React.createRef();
    }

    toggleAccordion = (event) => {
        const theId = event.target.parentNode.parentNode.id;
        // this.handleState(theId)
        // console.log(this.hiddenAccordionRef.current)
    }

    // handleState = (clickedID) => {
    //     const hiddenAccordion = document.querySelector(`#${clickedID}.hidden-accordion`);
    //     console.log('hiddenAccordion', hiddenAccordion)
    //     const animateBlock = document.querySelector(`#${clickedID}.hidden-accordion`).childNodes[0];
    //     console.log('animateBlock', animateBlock)
    //     this.props.watchListMovies.map(el => {
    //         if (el.isOpen && el.id === clickedID) {
    //             hiddenAccordion.style.display = 'flex';
    //             hiddenAccordion.style.maxHeight = hiddenAccordion.scrollHeight + "px";
    //             animateBlock.style.animationName = 'accordion';
    //         } else if (!el.isOpen && el.id === clickedID) {
    //             hiddenAccordion.style.maxHeight = null;
    //             animateBlock.style.animationName = 'accordion-fade-out';
    //         }
    //     })
    // }


    render() {
        const { watchListIsOpen, dispatchToggleWatchList, watchListMovies } = this.props
        console.log('WatchList.js Trigerred')
        return (
            <React.Fragment >
                <div className={watchListIsOpen ? "watch-list-overlay slide-in" : "watch-list-overlay"}>
                    < div className="space-wrapper">
                        <WatchListHeader />
                        <div className="watch-list-body">
                            {/* Start accordion */}
                            {watchListMovies.map(movie => {
                                return (
                                    <React.Fragment>
                                        <a onClick={(e) => this.toggleAccordion(e)} className="open-accordion" id={movie.imdbID}>
                                            <div className="watch-list-item-container">
                                                <p className="flex-grow-big">{movie.Title}</p>
                                                <p>{movie.Year}</p>
                                                <p className="flex-grow-big">{movie.Director}</p>
                                                <p>{movie.Country}</p>
                                                <p>{movie.Genre}</p>
                                                <p className='plus-button'>+</p>
                                            </div>
                                        </a>
                                        <div ref={this.hiddenAccordionRef} className="hidden-accordion" id={movie.imdbID}>
                                            <div className="hidden-accordion-padding">
                                                <div className="flex-accordion-img">
                                                    <img src={require('./poster.jpeg')}></img>
                                                </div>
                                                <div className="flex-accordion-body flex-grow-big">
                                                    <p><br />Synopsis:<br />{movie.Plot}</p>
                                                    <p>Director:<br />{movie.Director}</p>
                                                    <p>Actors:<br />{movie.Actors}</p>
                                                    <p>Genre:<br />{movie.Genre}</p>
                                                    <p>Duration:<br />{movie.Duration}</p>
                                                    <a className="off-watch-list-button">Remove from Watchlist</a>
                                                </div>
                                            </div>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                            }
                        </div>

                        {/* // <div className="hidden-accordion" id="anton-id">
                                //     <div className="hidden-accordion-padding">
                                //         <div className="flex-accordion-img">
                                //             <img src={require('./poster.jpeg')}></img>
                                //         </div>
                                //         <div className="flex-accordion-body flex-grow-big">
                                //             <p><br />Synopsis:<br />lorem</p>
                                //             <p>Director:<br />lorem</p>
                                //             <p>Actors:<br />lorem</p>
                                //             <p>Genre:<br />lorem</p>
                                //             <p>Duration:<br />lorem</p>
                                //             <a className="off-watch-list-button">Remove from Watchlist</a>
                                //         </div>
                                //     </div>
                                // </div> */}

                        <div className="watch-list-footer">

                        </div>

                    </div>
                </div>
            </React.Fragment >
        )
    }
}
const mapStateToProps = state => ({
    watchListIsOpen: state.rootWatchListReducer.watchListOpen
})

const mapDispatchToProps = dispatch => ({
    dispatchToggleWatchList: () => dispatch(action_toggle_watch_list())
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchList) 

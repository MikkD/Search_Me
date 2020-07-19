import React, { Component } from 'react'
import './WatchList.css'
import WatchListHeader from './WatchListHeader/WatchListHeader';
import { connect } from 'react-redux';
import { action_toggle_watch_list } from '../redux/watchlist/watchlist.action';


export class WatchList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: [
                {
                    isOpen: false,
                    id: 'anton-id'
                },
                {
                    isOpen: false,
                    id: 'nick-id'
                },
                {
                    isOpen: false,
                    id: 'body-id'
                }
            ],
        }
    }

    toggleAccordion = (event) => {
        let clickedID = event.target.parentNode.parentNode.id;
        let update = this.state.toggle.map(el => {
            if (el.id === clickedID) {
                el.isOpen = !el.isOpen
            }
            return el
        })
        this.setState({ toggle: update }, () => {
            this.handleState(clickedID)
        })
    }
    handleState = (clickedID) => {
        let hiddenAccordion = document.querySelector(`#${clickedID}.hidden-accordion`);
        let animateBlock = document.querySelector(`#${clickedID}.hidden-accordion`).childNodes[0];
        this.state.toggle.map(el => {
            if (el.isOpen && el.id === clickedID) {
                hiddenAccordion.style.display = 'flex';
                hiddenAccordion.style.maxHeight = hiddenAccordion.scrollHeight + "px";
                animateBlock.style.animationName = 'accordion';
            } else if (!el.isOpen && el.id === clickedID) {
                hiddenAccordion.style.maxHeight = null;
                animateBlock.style.animationName = 'accordion-fade-out';
            }
        })
    }


    render() {
        const { watchListIsOpen, dispatchToggleWatchList } = this.props
        console.log('WatchList.js Trigerred')
        return (
            <React.Fragment >
                <div className={watchListIsOpen ? "watch-list-overlay slide-in" : "watch-list-overlay"}>
                    {/* <div className={watchListState ? "watch-list-overlay" : "watch-list-overlay slide-in"}> */}
                    < div className="space-wrapper">
                        <WatchListHeader watchListToggle={this.props.watchListToggle} />
                        <div className="watch-list-body">
                            {/* Start accordion */}
                            <a onClick={this.toggleAccordion} className="open-accordion" id="anton-id">
                                <div className="watch-list-item-container">
                                    <p className="flex-grow-big">Title</p>
                                    <p>Year</p>
                                    <p className="flex-grow-big">Director</p>
                                    <p>Country</p>
                                    <p>Genre</p>
                                    <p className='plus-button'>+</p>
                                </div>
                            </a>
                            <div className="hidden-accordion" id="anton-id">
                                <div className="hidden-accordion-padding">
                                    <div className="flex-accordion-img">
                                        <img src={require('./poster.jpeg')}></img>
                                    </div>
                                    <div className="flex-accordion-body flex-grow-big">
                                        <p><br />Synopsis:<br />lorem</p>
                                        <p>Director:<br />lorem</p>
                                        <p>Actors:<br />lorem</p>
                                        <p>Genre:<br />lorem</p>
                                        <p>Duration:<br />lorem</p>
                                        <a className="off-watch-list-button">Remove from Watchlist</a>
                                    </div>
                                </div>
                            </div>
                            {/* End Accordion */}
                        </div>
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

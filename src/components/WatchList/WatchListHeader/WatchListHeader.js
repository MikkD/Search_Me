import React from 'react'
import './WatchListHeader.css';
import { connect } from 'react-redux';
import { action_toggle_watch_list } from '../../redux/watchlist/watchlist.action';


export class WatchListHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {
        console.log('WatchListHeader.js Trigerred')
        return (
            <React.Fragment>
                <div className="watch-list-header">
                    <div className="watch-list-header-item">Your WatchList</div>
                    <div
                        onClick={() => this.props.dispatchToggleWatchList()}
                        className="watch-list-header-close-button">
                        <i className="fa fa-times fa-xs" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="watch-list-filter" >
                    {window.innerWidth >= 600 ?
                        (<React.Fragment>
                            < div className="title-filter flex-grow-big"><a className="button">Title</a></div>
                            <div className="release-date-filter"><a className="button">Year</a></div>
                            <div className="director-filter flex-grow-big"><a className="button">Director</a></div>
                            <div className="country-filter"><a className="button">Country</a></div>
                            <div className="genre-filter"><a className="button">Genre</a></div>
                            <div className="genre-filter"><a className="button"></a></div>

                        </React.Fragment>)
                        :
                        (<React.Fragment>
                            < div className="title-filter flex-grow-big">
                                <a className="button">Category By:</a>
                            </div>
                        </React.Fragment>)
                    }
                </div>
            </React.Fragment >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchToggleWatchList: () => dispatch(action_toggle_watch_list())
})

export default connect(null, mapDispatchToProps)(WatchListHeader)




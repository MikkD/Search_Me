import React from 'react'
import './WatchListHeader.css';
import { connect } from 'react-redux';
import { action_toggle_watch_list } from '../../redux/watchlist/watchlist.action';


export class WatchListHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filterOptions: ['Title', 'Year', 'Director', 'Country', 'Genre']
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
                <div className="watch-list-filter invisible" >
                    {this.state.filterOptions.map(filterBy => {
                        return (
                            <div className={filterBy}>
                                <a className="button">{filterBy}</a>
                            </div>
                        )
                    })}
                </div>
                < div className="title-filter  visible">

                    <select id="filter-items">
                        <option>Category By:</option>
                        {this.state.filterOptions.map(filterType => <option value={filterType}>{filterType}</option>)}
                    </select>
                </div>
            </React.Fragment >
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchToggleWatchList: () => dispatch(action_toggle_watch_list())
})

export default connect(null, mapDispatchToProps)(WatchListHeader)




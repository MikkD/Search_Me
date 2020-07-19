import React from 'react'
import './NavBar.css';
import { connect } from 'react-redux';
import { action_toggle_watch_list } from '../redux/watchlist/watchlist.action';


const NavBar = ({ dispatchToggleWatchList }) => {
    console.log('NavBar.js Trigerred', dispatchToggleWatchList)

    return (
        < React.Fragment >
            <nav className='flex-nav'>
                <div className='flex-nav-item'>
                    <span className='fa-icon'>
                        <i className="fas fa-film"></i>
                    </span>
                        Movie DataBase App
                </div>
                <div className='flex-nav-item'>
                    <button
                        onClick={() => dispatchToggleWatchList()}
                        className="watch-list-button">
                        <i className="fas fa-list-alt"></i>
                        <div className='nav-counter'>0</div>
                    </button>
                </div>
            </nav>
        </React.Fragment >
    )

}

const mapDispatchToProps = dispatch => ({
    dispatchToggleWatchList: () => dispatch(action_toggle_watch_list())
})

export default connect(null, mapDispatchToProps)(NavBar)






import React, { PureComponent } from 'react'
import './NavBar.css';



class NavBar extends PureComponent {

    render() {
        return (
            < React.Fragment >
                <nav className='flex-nav'>
                    <div className='flex-nav-item'>
                        WatchMe
                </div>
                    <button
                        onClick={() => this.props.toggleWatchList()}
                        className="watch-list-button">
                        <i className="fas fa-film"></i>
                        <div className='nav-counter'>{this.props.watchListMoviesNumber}</div>
                    </button>
                </nav>
            </React.Fragment >
        )
    }

}

export default NavBar






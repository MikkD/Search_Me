import React, { Component } from 'react'
import './NavBar.css'


export class NavBar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }


    render() {
        console.log('NavBar.js Trigerred')
        return (
            < React.Fragment >
                <nav className='flex-nav'>
                    <div className='flex-nav-item'>
                        <span className='fa-icon'>
                            <i className="fas fa-film"></i></span>
                                Movie DataBase App
                        </div>
                    <div className='flex-nav-item'>
                        <button onClick={() => this.props.watchListToggle()} className="watch-list-button">
                            <i className="fas fa-list-alt"></i><div className='nav-counter'>0</div></button>
                    </div>
                </nav>
            </React.Fragment >
        )

    }
}

export default NavBar






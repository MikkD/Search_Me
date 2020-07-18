import React, { Component } from 'react'
import './SearchBar.css'

export class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    render() {
        console.log('SearchBar.js Trigerred')
        return (
            <React.Fragment>
                <header>
                    <h1>IMDB Database</h1>
                    <div className="input-search-wrapper">
                        <input
                            onChange={(e) => this.setState({ search: e.target.value })}
                            onKeyPress={(event) => event.key === 'Enter' ? this.props.fetchData(`?s=${this.state.search}`) : null}
                            value={this.state.search}
                            id="search-input"
                            placeholder="Enter a movie" />
                        <button
                            onClick={() => this.state.search && this.props.fetchData(`?s=${this.state.search}`)}
                            className="search-button"><span>🔍</span></button>
                    </div>
                </header>
            </React.Fragment >
        )
    }
}

export default SearchBar

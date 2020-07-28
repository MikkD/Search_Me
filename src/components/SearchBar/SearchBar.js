import React, { PureComponent } from 'react'
import './SearchBar.css'

export class SearchBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            prevSearchValue: '',

        }
    };

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.state.prevSearchValue !== this.state.searchValue && this.state.searchValue) {
            this.props.fetchData(`?s=${this.state.searchValue}`)
            this.setState({
                prevSearchValue: this.state.searchValue,
                searchValue: ''
            })

        }
    };

    handleChange = (event) => {
        this.setState({
            searchValue: event.target.value,
            prevSearchValue: this.state.searchValue
        })
    };

    render() {
        return (
            <React.Fragment>
                <div className="input-search-wrapper">
                    <form className='input-form' onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            onChange={(e) => this.handleChange(e)}
                            value={this.state.searchValue}
                            id="search-input"
                            placeholder="Enter a movie" />
                        <button
                            onClick={this.handleSubmit}
                            className="search-button">
                            <span>🔍</span>
                        </button>
                    </form>
                </div>
            </React.Fragment >
        )
    }
}

export default SearchBar

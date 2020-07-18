import React, { Component } from 'react'
import './Movies.css';
import Modal from '../Modal/Modal'

export class Movies extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalVisible: false
        }
    }
    render() {
        console.log('Movies.js triggered')
        return (
            <React.Fragment>
                <div className="main">
                    <div className="flex-parent">
                        {this.props.movies.map(movie => {
                            return (
                                <div className="flex-item" key={movie.imdbID}>
                                    <img src={movie.Poster} />
                                    <div className="flex-description">
                                        <p>{movie.Title}</p>
                                        <p>{movie.Year}</p>
                                        <p>
                                            <button
                                                className="details-button"
                                                onClick={(event) => this.props.fetchData(`?i=${event.target.id}`) &&
                                                    this.setState({ modalVisible: !this.state.modalVisible })}
                                                id={movie.imdbID}>Details
                                                </button>
                                        </p>
                                    </div>
                                </div>

                            )
                        })}
                        <Modal
                            watchListHandler={this.props.watchListHandler}
                            modalHandler={() => this.setState({ modalVisible: !this.state.modalVisible })}
                            modalVisible={this.state.modalVisible}
                            movie={this.props.movie}
                        />
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default Movies

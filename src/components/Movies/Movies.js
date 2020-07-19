import React, { Component } from 'react'
import './Movies.css';
import Modal from '../Modal/Modal'

export class Movies extends Component {
    render() {
        console.log('Movies.js triggered')
        const { movies, errorHandler } = this.props;
        return (
            <React.Fragment>
                <div className="main">
                    <div className="flex-parent">
                        {movies.length ? movies.map(movie => {
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
                                                    this.props.modalIsOpen()}
                                                id={movie.imdbID}>Details
                                            </button>
                                        </p>
                                    </div>

                                </div>
                            )
                        }) : <h1 className="error-message">{errorHandler}</h1>}
                        {/* <Modal
                            watchListHandler={this.props.watchListHandler}
                            modalHandler={() => this.setState({ modalVisible: !this.state.modalVisible })}
                            modalVisible={this.state.modalVisible}
                            movie={this.props.movie}
                        /> */}
                    </div>

                </div>
            </React.Fragment >

        )
    }
}

export default Movies

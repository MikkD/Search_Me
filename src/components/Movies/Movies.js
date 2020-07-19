import React, { PureComponent } from 'react';
import './Movies.css';

export class Movies extends PureComponent {


    handleClick = (e) => {


        this.props.modalIsOpen()
    }
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
                                                // onClick={(event) => this.props.fetchData(`?i=${event.target.id}`) &&
                                                //     this.props.modalIsOpen()}
                                                onClick={(e) => this.handleClicks(e)}
                                                id={movie.imdbID}>Details
                                            </button>
                                        </p>
                                    </div>

                                </div>
                            )
                        }) : <h1 className="error-message">{errorHandler}</h1>}
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default Movies

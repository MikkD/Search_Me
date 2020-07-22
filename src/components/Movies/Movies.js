import React, { PureComponent } from 'react';
import './Movies.css';

export class Movies extends PureComponent {

    handleClick = (event) => {
        this.props.fetchData(`?i=${event.target.id}`)
        this.props.modalIsOpen()
    }



    render() {
        console.log('Movies.js triggered')
        const { movies } = this.props;
        return (
            <React.Fragment>
                <div className="flex-parent">
                    {movies.map(movie => {
                        return (
                            <div className="flex-item" key={movie.imdbID}>
                                <img src={movie.Poster != 'N/A' ? movie.Poster : require('../../assets/img/fallback_image.jpg')} />
                                <div className="flex-description">
                                    <p>{movie.Title}</p>
                                    <p>{movie.Year}</p>
                                    <p>
                                        <button
                                            className="details-button"
                                            onClick={(e) => this.handleClick(e)}
                                            id={movie.imdbID}>Details
                                            </button>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment >
        )
    }
}

export default Movies

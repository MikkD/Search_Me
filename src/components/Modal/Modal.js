import React, { Component } from 'react';
import './Modal.css';

export class Modal extends Component {

    handleEsc = (event) => { if (event.keyCode === 27) { this.props.modalIsOpen() } }
    componentDidMount() { window.addEventListener('keydown', this.handleEsc) }
    componentWillUnmount() { window.removeEventListener('keydown', this.handleEsc) }


    render() {
        console.log('Modal Triggered')
        const { Poster, Title, Plot, Year, Director, Genre, imdbRating, imdbID } = this.props.movie;
        return (
            < React.Fragment >
                <div className="modal-big">
                    <div className="modal-container">
                        <div className="modal-header">
                            <p>{Title}</p>
                            <button
                                className="close-modal-button"
                                onClick={this.props.modalIsOpen}>
                                <span>✖</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-item modal-image">
                                <img src={Poster} alt="image" className="modal-image" />
                            </div>
                            <div className="modal-item modal-description">
                                <p><span>Title:</span>{Title}</p>
                                <p><span>Plot:</span>{Plot}</p>
                                <p><span>Year:</span>{Year}</p>
                                <p><span>Director:</span>{Director}</p>
                                <p><span>Genre:</span>{Genre}</p>
                                <p><span>IMDB Rating</span>{imdbRating}</p>
                                <p><button
                                    id={imdbID}
                                    onClick={() => this.props.watchListHandler(this.props.movie)}
                                    className="watchlist-button">
                                    {this.props.watchListMovies.some(movie => movie.imdbID === imdbID) ?
                                        'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}
                                </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}

export default Modal

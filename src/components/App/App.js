import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Movies from '../Movies/Movies';
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import WatchList from '../WatchList/WatchList';
import { getDataUtil } from './utils';
import Modal from '../Modal/Modal';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      movie: {},
      pageNumber: 1,
      watchListMovies: [],
      errorHandler: '',
      modalVisible: false
    }
    this.bodyRef = React.createRef()
  }


  fetchData = async (queryParam,) => {
    console.log('didApiCall')
    const identifier = queryParam.slice(0, 3)
    switch (identifier) {
      case '?s=':
        const theMovies = await getDataUtil(queryParam);
        theMovies.Search ? this.setState({ movies: theMovies.Search }) : this.setState({ errorHandler: 'Movie not found!' })
        break;
      case '?i=':
        const theMovie = await getDataUtil(queryParam)
        this.setState({ movie: { ...theMovie, isAddedToWatchList: false } });
        break;
      default:
        console.error('MOVIE NOT FOUND')
    }
  }

  watchListHandler = (newWatchListMovie) => {
    let currentWatchListMovies = [...this.state.watchListMovies];
    let dublicate = currentWatchListMovies.find(el => el.imdbID === newWatchListMovie.imdbID)
    console.log('dublicate', dublicate)
    if (!dublicate) {
      this.setState({
        watchListMovies: [...this.state.watchListMovies, newWatchListMovie],
        movie: { ...newWatchListMovie, isAddedToWatchList: true }
      })
    } else {
      currentWatchListMovies.splice(currentWatchListMovies.indexOf(dublicate), 1)
      this.setState({
        watchListMovies: currentWatchListMovies,
        movie: { ...newWatchListMovie, isAddedToWatchList: false }
      })
    }
  }

  modalIsOpen = () => this.setState({ modalVisible: !this.state.modalVisible })

  render() {
    return (
      <React.Fragment>
        <div style={this.state.modalVisible ? { position: 'fixed' } : { position: 'relative' }}
          className="App"
          ref={this.bodyRef} >
          <WatchList
            watchListMovies={this.state.watchListMovies}
          />
          <NavBar
            watchListMoviesNumber={this.state.watchListMovies.length} />
          <SearchBar
            fetchData={this.fetchData}
            getMovies={this.getMovies} />
          <Movies
            errorHandler={this.state.errorHandler}
            fetchData={this.fetchData}
            getMovie={this.getMovie}
            movies={this.state.movies}
            modalIsOpen={this.modalIsOpen} />
          <Modal
            watchListHandler={this.watchListHandler}
            modalIsOpen={this.modalIsOpen}
            modalVisible={this.state.modalVisible}
            movie={this.state.movie} /> :

        </div >
      </React.Fragment >
    )
  }

}

export default App


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
      watchListIsOpen: false,
      errorHandler: '',
      modalVisible: false,
      totalNumberOfPosters: 0,
      queryParameter: ''
    }
  }


  fetchData = async (queryParam = this.state.queryParameter, clickedPage) => {
    console.log('didApiCall')
    const identifier = queryParam.slice(0, 3);
    switch (identifier) {
      case '?s=':
        const theMovies = await getDataUtil(queryParam, clickedPage);
        theMovies.Search ? this.setState({
          movies: theMovies.Search,
          totalNumberOfPosters: theMovies.totalResults,
          queryParameter: queryParam
        }) : this.setState({ errorHandler: 'Movie not found!' })
        break;
      case '?i=':
        const theMovie = await getDataUtil(queryParam, clickedPage)
        this.setState({ movie: { ...theMovie, isAddedToWatchList: false } });
        break;
    }
  }

  watchListHandler = (newWatchListMovie) => {
    let currentWatchListMovies = [...this.state.watchListMovies];
    let dublicate = currentWatchListMovies.find(el => el.imdbID === newWatchListMovie.imdbID)
    if (!dublicate) {
      this.setState({
        watchListMovies: [...this.state.watchListMovies,
        { ...newWatchListMovie, isAddedToWatchList: true, hiddenAccordionClicked: false }]
      })
    } else {
      currentWatchListMovies.splice(currentWatchListMovies.indexOf(dublicate), 1)
      this.setState({ watchListMovies: currentWatchListMovies })
    }
  }

  componentDidMount() {
    this.setState({ watchListMovies: JSON.parse(localStorage.getItem('watchlistMovies')) })
  }

  componentDidUpdate() {
    localStorage.setItem('watchlistMovies', JSON.stringify(this.state.watchListMovies))
  }

  hiddenAccordionHandler = (watchListMovieId) => {
    const newMovies = this.state.watchListMovies.map(movie => movie.imdbID === watchListMovieId ?
      { ...movie, hiddenAccordionClicked: !movie.hiddenAccordionClicked } : movie);
    this.setState({ watchListMovies: newMovies })
  }

  modalIsOpen = () => this.setState({ modalVisible: !this.state.modalVisible })

  filterWatchList = (filterBy) => {
    const currentWatchListMovies = [...this.state.watchListMovies]
    currentWatchListMovies.sort((a, b) => a[`${filterBy}`] > b[`${filterBy}`] ? 1 : -1)
    this.setState({ watchListMovies: currentWatchListMovies })
  }


  render() {
    return (
      <React.Fragment>
        <div style={this.state.modalVisible ? { position: 'fixed' } : { position: 'relative' }}
          className="App"
          ref={this.bodyRef} >
          <WatchList
            watchListIsOpen={this.state.watchListIsOpen}
            filterWatchList={this.filterWatchList}
            watchListHandler={this.watchListHandler}
            hiddenAccordionHandler={this.hiddenAccordionHandler}
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
          <Pagination
            fetchData={this.fetchData}
            totalNumberOfPosters={this.state.totalNumberOfPosters}
            movies={this.state.movies}
          />
          <Modal
            watchListHandler={this.watchListHandler}
            modalIsOpen={this.modalIsOpen}
            modalVisible={this.state.modalVisible}
            watchListMovies={this.state.watchListMovies}
            movie={this.state.movie} />
        </div >
      </React.Fragment >
    )
  }

}

export default App


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


  fetchData = async (queryParam) => {
    const identifier = queryParam.slice(0, 3)
    switch (identifier) {
      case '?s=':
        let theMovies = await getDataUtil(queryParam);
        theMovies.Search ? this.setState({ movies: theMovies.Search }) : this.setState({ errorHandler: 'Movie not found!' })
        break;
      case '?i=':
        const theMovie = await getDataUtil(queryParam)
        this.setState({ movie: theMovie });
        break;
      default:
        console.error('MOVIE NOT FOUND')
    }
    const bodyNode = this.bodyRef.current;
    bodyNode.style.backgroundBlendMode = "multiply";
    bodyNode.style.backdropFilter = "blur(2px)";
  }


  watchListHandler = (movieObject) => {
    let movieToAdd = movieObject;
    let currentWatchListMovies = [...this.state.watchListMovies];
    let newWatchListMovie = {
      watchListMovie: movieToAdd,
      isAdded: true
    }
    // Checked if array is not empty
    if (!currentWatchListMovies.length) {
      currentWatchListMovies = [...this.state.watchListMovies, newWatchListMovie]
      this.setState({ watchListMovies: currentWatchListMovies })

    } else {
      // Added if no dublicate is present
      let dublicate = currentWatchListMovies.find(el => el.watchListMovie.imdbID === movieToAdd.imdbID)
      if (!dublicate) {
        this.setState({ watchListMovies: [...this.state.watchListMovies, newWatchListMovie] })
      } else {
        // Spliced if dublicate is present
        currentWatchListMovies.splice(currentWatchListMovies.indexOf(dublicate), 1)
        this.setState({ watchListMovies: currentWatchListMovies })
      }

    }
  }
  modalIsOpen = () => this.setState({ modalVisible: !this.state.modalVisible })

  render() {
    return (
      <React.Fragment>
        <div style={this.state.modalVisible ? { position: 'fixed' } : { position: 'relative' }} className="App" ref={this.bodyRef} >
          <WatchList
            watchListToggle={this.watchListToggle}
            watchListState={this.state.watchList} />
          <NavBar />
          <SearchBar
            fetchData={this.fetchData}
            getMovies={this.getMovies} />
          <Movies
            errorHandler={this.state.errorHandler}
            fetchData={this.fetchData}
            getMovie={this.getMovie}
            movies={this.state.movies}
            movie={this.state.movie}
            watchListHandler={this.watchListHandler}
            modalIsOpen={this.modalIsOpen} />
          <Pagination
            pageNumber={this.state.pageNumber}
            getMovies={this.getMovies}
            currentMovies={this.state.movies} />
          {/* <Modal /> */}

          <Modal
            watchListHandler={this.watchListHandler}
            modalHandler={() => this.setState({ modalVisible: !this.state.modalVisible })}
            modalVisible={this.state.modalVisible}
            movie={this.state.movie}
          />

        </div >
      </React.Fragment >
    )
  }

}

export default App


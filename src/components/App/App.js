import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Movies from '../Movies/Movies';
import Pagination from '../Pagination/Pagination';
import NavBar from '../NavBar/NavBar';
import WatchList from '../WatchList/WatchList';

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      movie: {},
      pageNumber: 1,
      watchList: false,
      watchListMovies: []
    }
  }


  // getMovies = (searchQuery, pageNum) => {
  //   const basicUrl = 'http://www.omdbapi.com/'
  //   const queryParam = `?s=${searchQuery}`
  //   const numberOfPages = `&page=${pageNum > 1 ? pageNum : this.state.pageNumber}`
  //   const apiKey = '&apikey=3755d9aa'
  //   let endpoint = basicUrl + queryParam + numberOfPages + apiKey;
  //   fetch(endpoint)
  //     .then(res => res.json())
  //     .then(parsedJSON => {
  //       if (parsedJSON.Search) {
  //         this.setState({ movies: parsedJSON.Search })
  //       }
  //     })
  //     .catch(err => console.log('error is ', err))
  //   let theBody = document.querySelector('body')
  //   theBody.style.backgroundBlendMode = "multiply";
  //   theBody.style.backdropFilter = "blur(1px)";
  // }

  // getMovie = (movieID) => {
  //   const basicUrl = 'http://www.omdbapi.com/'
  //   const queryParam = `?i=${movieID} `
  //   const apiKey = '&apikey=3755d9aa'
  //   let endpoint = basicUrl + queryParam + apiKey;
  //   fetch(endpoint)
  //     .then(res => res.json())
  //     .then(parsedJSON => {
  //       this.setState({ movie: parsedJSON })
  //     })
  //     .catch(err => console.log('error is ', err))
  // }

  getDataUtil = async queryParam => {
    const basicUrl = 'http://www.omdbapi.com/'
    const apiKey = '&apikey=3755d9aa'
    const endpoint = basicUrl + queryParam + apiKey;
    const fetchedData = await fetch(endpoint)
      .then(res => res.json())
      .then(parsedJSON => parsedJSON)
      .catch(err => console.log('error is ', err))
    return fetchedData
  }


  fetchData = async (queryParam) => {
    const identifier = queryParam.slice(0, 3)
    switch (identifier) {
      case '?s=':
        let theMovies = await this.getDataUtil(queryParam);
        this.setState({ movies: theMovies.Search });
        break;
      case '?i=':
        const theMovie = await this.getDataUtil(queryParam)
        this.setState({ movie: theMovie });
        break;
      default:
        console.error('MOVIE NOT FOUND')
    }
    // let theBody = document.querySelector('body')
    //   theBody.style.backgroundBlendMode = "multiply";
    //   theBody.style.backdropFilter = "blur(1px)";
  }

  watchListToggle = () => this.setState({ watchList: !this.state.watchList });

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



  render() {
    console.log('watch list movies is ', this.state.watchListMovies)
    return (
      <React.Fragment>
        <div className="App">
          <WatchList
            watchListToggle={this.watchListToggle}
            watchListState={this.state.watchList} />
          <NavBar
            watchListNumber={this.state.watchListCounter}
            watchListToggle={this.watchListToggle} />
          <SearchBar
            fetchData={this.fetchData}
            getMovies={this.getMovies} />
          <Movies
            fetchData={this.fetchData}
            getMovie={this.getMovie}
            movies={this.state.movies}
            movie={this.state.movie}
            watchListHandler={this.watchListHandler} />
          <Pagination
            pageNumber={this.state.pageNumber}
            getMovies={this.getMovies}
            currentMovies={this.state.movies} />
        </div >
      </React.Fragment>
    )
  }

}

export default App


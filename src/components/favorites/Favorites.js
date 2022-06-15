import React, { Component } from 'react'
import './favorites.css';


export default class Favorites extends Component {

    constructor() {
        super();
        this.state = {
            genres: [],
            movies: [],
            currentGenre: 'All Genres',
            currentText: '',
            fileteredMovies: []
        }
    }

    componentDidMount() {

        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let data = JSON.parse(localStorage.getItem('movies'));

        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]]))
                temp.push(genreids[movieObj.genre_ids[0]]);
        });
        temp.unshift('All Genres');


        this.setState({
            genres: [...temp],
            movies: [...data],
            fileteredMovies : [...data]
        })

    }

    handleGenres = (genre) => {
        this.setState({
            currentGenre: genre
        }, this.handleFileteredMovies);
    }

    handleFileteredMovies = () => {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        let filteredArr = []

       if(this.state.currentGenre === 'All Genres' && this.state.currentText === ''){
           filteredArr = this.state.movies;
       }

        if (this.state.currentText === '' && this.state.currentGenre !== 'All Genres') {
            filteredArr = this.state.fileteredMovies;
        }
        else {
            filteredArr = this.state.movies.filter((movieObj) => {
                let searchFor = movieObj.title.toLowerCase();
                return searchFor.includes(this.state.currentText.toLowerCase());
            })
        }

        if (this.state.currentGenre !== 'All Genres') {
            filteredArr = this.state.movies.filter((movieObj) =>
                this.state.currentGenre === genreids[movieObj.genre_ids[0]]
            )
        }
        
        this.setState({
            fileteredMovies: [...filteredArr]
        })
    }

    sortPopularity = () => {
        let temp = this.state.fileteredMovies;
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity;
        })
        this.setState({
            fileteredMovies: [...temp]
        })
    }

    sortRating = () =>{
        let temp = this.state.fileteredMovies;
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average;
        })
        this.setState({
            fileteredMovies: [...temp]
        })
    }

    handleDelete = (id) =>{
        let newarr = [];
        newarr = this.state.movies.filter((movie) => movie.id !== id);
        this.setState({
            movies : [...newarr],
            fileteredMovies : [...newarr]
        })
        localStorage.setItem('movies', JSON.stringify(newarr));
    }
    render() {

        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <ul className="list-group favourites-genres">
                                {
                                    this.state.genres.map((value) => (
                                        this.state.currentGenre === value ?
                                            <li className="list-group-item" style={{ background: '#3f51b5', color: 'white', fontweight: '500', cursor: 'pointer' }}>{value}</li> :
                                            <li className='list-group-item' style={{ background: 'white', color: '#3f51b5', fontweight: '500', cursor: 'pointer' }} onClick={() => this.handleGenres(value)}>{value}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-9 favourites-table">
                            <div className='row'>
                                <input type='text' className='input-group-text col' placeholder='search' value={this.state.currentText} onChange={(e) => this.setState({ currentText: e.target.value }, this.handleFileteredMovies)}></input>
                            </div>
                            <div className='row'>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Title</th>
                                            <th scope="col">genres</th>
                                            <th scope="col"><i className='fas fa-sort-up' onClick={this.sortPopularity}></i>popularity</th>
                                            <th scope='col'><i className='fas fa-sort-up' onClick={this.sortRating}></i>rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.fileteredMovies.map((movieObj) => (
                                                <tr>
                                                    
                                                    <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem', marginRight : '1rem'}}></img>{movieObj.title}</td>
                                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td>{movieObj.popularity}</td>
                                                    <td>{movieObj.vote_average}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

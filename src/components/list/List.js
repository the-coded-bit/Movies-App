import React, { Component } from 'react';
import './list.css';
import apiConfig from '../../apis/apiConfig';
import axios from 'axios';

export default class List extends Component {

    constructor(){
        super();
        this.state = {
            parr :[1],
            currentPage : 1,
            movies : [],
            favourites : []
        }
    }

    async componentDidMount(){
        console.log(localStorage.getItem('movies'));
        
        console.log("from component did mount");
        this.handleFavouritesState();
        this.changeMovies();
        console.log('mounting done');
    }

    changeMovies = async () =>{
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiConfig.apiKey}&language=en-US&page=${this.state.currentPage}`
        const res = await axios.get(url);
        const data = res.data
        this.setState({
            movies : [...data.results]
        })
    }

    handleNext = () =>{
        let temparr = [];
        for(let i = 0; i <= this.state.parr.length; i++){
            temparr.push(i + 1);
        }

        this.setState({
            parr : [...temparr],
            currentPage : this.state.currentPage + 1
        },this.changeMovies);   
    }

    handlePrevious = ()=>{
        if(this.state.currentPage !== 1){
            this.setState({
                currentPage : this.state.currentPage - 1,
                parr : this.state.parr.slice(0, -1)
            }, this.changeMovies)
        }
    }

    handleClick = (page) =>{
        if(page !== this.state.currentPage){
            this.setState({
                currentPage : page,
            }, this.changeMovies)
        }
    }
    handleFavourites = (movie) =>{
        console.log('favourites method running');
        let OldVal = JSON.parse( localStorage.getItem('movies') || '[]');
        if(this.state.favourites.includes(movie.id)){
           OldVal =  OldVal.filter((m) => m.id !== movie.id);
        }
        else{
            OldVal.push(movie)
        }
        localStorage.setItem('movies', JSON.stringify(OldVal));
        console.log(OldVal, localStorage.getItem('movies'));
        this.handleFavouritesState();
    }

    handleFavouritesState = () =>{
        let OldVal = JSON.parse( localStorage.getItem('movies') || '[]');
        let temp = OldVal.map((movie) => movie.id);
        this.setState({
            favourites : [...temp]
        });
    }

    
    render() { 
        return (
            <div>
                {
                    this.state.movies.length === 0?
                    <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                    : 
                    <div>
                        <h3 className='text-center trending'><strong>{this.props.name}</strong></h3>
                        <div className='movies-container'>
                            {
                                this.state.movies.map((movieObj) =>(
                                    <div className='movies-card' key={movieObj.id}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title}></img>
                                        <div className='movies-modal'>
                                            <div className='btn'>
                                            <i className={this.state.favourites.includes(movieObj.id)?"fas fa-trash-alt" :  "fas fa-heart"  } style={{color : (this.state.favourites.includes(movieObj.id)? 'black' : 'red')}} onClick={() => this.handleFavourites(movieObj)}></i>
                                            </div>
                                            <h4>{movieObj.title}</h4>
                                        </div>
                                        
                                    </div>
                                ))
                            }
                        </div>
                        <div className='pagination'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" onClick={this.handlePrevious} >Previous</a></li>
                                {   
                                    this.state.parr.map((page) =>(
                                        <li className="page-item"><a className="page-link" onClick={() => {this.handleClick(page)}}>{page}</a></li>
                                    ))
                                }
                            <li className="page-item"><a className="page-link" onClick={this.handleNext}>Next</a></li>
                            </ul>
                        </nav>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

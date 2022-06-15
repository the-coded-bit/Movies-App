import React, { Component } from 'react';
import { movies } from '../getMovies';
import './banner.css';

export default class Banner extends Component {

   
    render() {
        let banner = movies.results[5];
        // let banner = '';
        console.log(movies.results.length);
        return (
            <div className='banner-box'>
            {
            
                (banner === '')? 
                <div className='spinner'>
                </div>
                :
                <div className='wrap-container' style={{backgroundImage: `url(${`https://image.tmdb.org/t/p/original${banner.backdrop_path}`})`}}>
                    <div className='box-content'>
                        <h4>{banner.title}</h4>
                        <p>{banner.overview}</p>
                    </div>
                </div>
            }
            </div>
            )
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default class Navbar extends Component {
    render() {
        return (
            <div className='Navbar'>
                <h1>
                    <Link to = '/' className='link'>
                        Movies App
                    </Link>
                </h1>
                <h4>
                    <Link to='/favourites' className='link'>
                        Favourites
                    </Link>
                </h4>
            </div>
        )
    }
}

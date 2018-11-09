import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

function Header() {
    return (
      <header>
      <div className="logo">TV Show Database</div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/tv-show'>Tv Shows</Link></li>
          <li>
          <Search/>
          </li>
          <li><Link to='/add'>Add Tv Show</Link></li>
        </ul>
      </nav>
      </header>
    );
  }

export default Header;

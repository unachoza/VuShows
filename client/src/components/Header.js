import React from 'react';
//import Search from './Search'
import { Link } from 'react-router-dom';

function Header() {
    return (
      <header>
      <div className="logo">TV Show Database</div>
      <nav>
        <ul>
      {/* <Search
        getInfo = {this.props.getInfo} */}
      
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/tv-show'>Tv Shows</Link></li>
          <li><Link to='/add'>Add Tv Show</Link></li>
        </ul>
      </nav>
      </header>
    );
  }

export default Header;

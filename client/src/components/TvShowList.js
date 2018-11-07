import React, { Component } from 'react';
// import TvShow from './TvShow';

class TvShowList extends Component {
    render() {
      return (
        <div className="main-container">
          <h1 className="mainheading"> tv shows </h1>
          <div className="tvshowlist-container">
            <div className="poster"></div>
            <div className="showinfo">
              <h3>friends (1994)</h3>
              <h4>Comedy</h4>
              <p>description of friends, the tv show and what it is about and all the funny stuff about friends</p>
              <button> see more </button>
            </div>
          </div>

          <div className="tvshowlist-container">
            <div className="poster"></div>
            <div className="showinfo">
              <h3>friends (1994)</h3>
              <h4>Comedy</h4>
              <p>description of friends, the tv show and what it is about and all the funny stuff about friends</p>
              <button> see more </button>
            </div>
          </div>

          <div className="tvshowlist-container">
            <div className="poster"></div>
            <div className="showinfo">
              <h3>friends (1994)</h3>
              <h4>Comedy</h4>
              <p>description of friends, the tv show and what it is about and all the funny stuff about friends</p>
              <button> see more </button>
            </div>
          </div>
        </div>
      )
  }


}



export default TvShowList;
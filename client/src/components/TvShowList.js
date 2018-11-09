import React, { Component } from 'react';
import axios from 'axios';
import TvShow from './TvShow';

class TvShowList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
    }

  }

  componentDidMount() {
    axios.get('/tvshow')
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          apiData: res.data.data,
        })
      })
  }

  renderTvShows() {
    if (this.state.apiDataLoaded) {
      return this.state.apiData.map(tvshow => {
        return (
          <TvShow key={tvshow.id} tvshow={tvshow} />
        );
      });
    } else return <p>Loading...</p>
  }

  render() {
    return (
      <div>
        <div className="tvshow-list">
          {this.renderTvShows()}
        </div>
      </div>
    )
  }
}

export default TvShowList;

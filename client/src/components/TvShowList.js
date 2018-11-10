import React, { Component } from 'react';
import axios from 'axios';
import TvShow from './TvShow';
//import Suggestions from './Suggestions'
// token 15051078061731916106618784648101
class TvShowList extends Component {
  constructor() {
    super();
    this.state = {
      apiDataLoaded: false,
      apiData: null,
      show: false,
    }

  }
  ///token needs to be passed as props, it lives in app (and local storage)

  //axios.post(`/db/${this.state.token}`, show)
  componentDidMount() {
//passed token 
    axios.get(`/db/${this.props.token}`)
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          apiData: res.data.data,
          show: true,
        })
        // console.log(this.state.apiData)
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
        {/* <Suggestions results={this.state.results} /> */}

        <div className="tvshow-list">
          {this.renderTvShows()}
        </div>
      </div>
    )
  }
}

export default TvShowList;

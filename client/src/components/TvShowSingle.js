import React, { Component } from 'react';

import axios from 'axios';

import { Link, Redirect } from 'react-router-dom';

import TvSeasonList from './TvSeasonList';

class TvShowSingle extends Component {
  constructor() {
    super();
    this.state = {
      tvShow: null,
      apiDataLoaded: false,
      fileRedirect: false,
    }
    this.deleteTvShow = this.deleteTvShow.bind(this);
  }

  componentDidMount() {
    //passed token here
    axios.get(`/db/${this.props.token}/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          apiDataLoaded: true,
          tvShow: res.data.data,
        })
      }).catch(err => console.log(err));
  }

  deleteTvShow() {
    axios.delete(`/db/${this.props.token}/${this.props.match.params.id}`)
      .then(res => {
        console.log(res);
        this.setState({
          fireRedirect: true,
        });
      }).catch(err => {
        console.log(err);
      });
  }


  renderTvShowOrLoading() {
    if (this.state.apiDataLoaded) {
      return (
        <div>
        <div className="inner">
          <div className="img">
            <img src={this.state.tvShow.url} alt={this.state.tvShow.name} />
          </div>
          <div className="info">
            <h1>{this.state.tvShow.name}</h1>
            <p>{this.state.tvShow.genre}</p>
            <p>{this.state.tvShow.network}</p>
            <p>{this.state.tvShow.showid}</p>
            <div className="links">
              <span className="rating">Rating: {this.state.tvShow.rating || 'N/A'}</span>
              <Link to={`/edit/${this.props.match.params.id}`}>Edit</Link>
              <span className="delete" onClick={this.deleteTvShow}>Delete</span>
              {this.state.fireRedirect
                ? <Redirect push to="/tv-show" />
                : ''}
            </div>
          </div>
        </div>
            <div>
              <TvSeasonList tvshow={this.state.tvShow}/>
            </div>
        </div>
      )
    } else return <p className="loading">Loading...</p>
  }

  render() {
    return (
      <div className="tvshow-single">
        {this.renderTvShowOrLoading()}
      </div>
    )
  }
}

export default TvShowSingle;

import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

class TvShowEditForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      genre: '',
      network: '',
      rating: '',
      url: '',
      showid: '',
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/tvshow/${this.props.match.params.id}`)
      .then((res) => {
        console.log(res);
        const tvShow = res.data.data;
        this.setState({
          name: tvShow.name,
          genre: tvShow.genre,
          network: tvShow.network,
          rating: tvShow.rating,
          url: tvShow.url,
          showid: tvShow.showid
        })
      }).catch(err => console.log(err));
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleFormSubmit(e) {
    e.preventDefault();
    axios
      .put(`/tvshow/${this.props.match.params.id}`, {
        name: this.state.name,
        genre: this.state.genre,
        network: this.state.network,
        rating: this.state.rating,
        url: this.state.url,
        showid: this.state.showid
      })
      .then(res => {
        console.log(res);
        this.setState({
          newId: res.data.data.id,
          fireRedirect: true,
        });
      })
      .catch(err => console.log(err));
    e.target.reset();
  }

  render() {
    return (
      <div className="edit">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            name
            <input
              type="text"
              placeholder="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            genre
          <input
              type="text"
              placeholder="genre"
              name="genre"
              value={this.state.genre}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            network
            <input
              type="text"
              placeholder="network"
              name="network"
              value={this.state.network}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            rating
            <input
              type="text"
              placeholder="rating"
              name="rating"
              value={this.state.rating}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            URL
            <input
              type="text"
              placeholder="URL"
              name="url"
              value={this.state.url}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Show ID
            <input
              type="text"
              placeholder="Show ID"
              name="showid"
              value={this.state.showid}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/tv-show/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default TvShowEditForm;

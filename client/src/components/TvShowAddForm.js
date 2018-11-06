import React, { Component } from 'react';

import axios from 'axios';

import { Redirect } from 'react-router-dom';

class TvShowAddForm extends Component {
  constructor() {
    super();
    this.state = {
      flavor: '',
      desc: '',
      rating: '',
      brand: '',
      url: '',
      fireRedirect: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
      .post('/tvshow', {
        flavor: this.state.flavor,
        description: this.state.desc,
        rating: this.state.rating,
        brand: this.state.brand,
        url: this.state.url,
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
      <div className="add">
        <form onSubmit={this.handleFormSubmit}>
          <label>
            Flavor
            <input
              type="text"
              placeholder="Flavor"
              name="flavor"
              value={this.state.flavor}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Description
            <input
              type="text"
              placeholder="Description"
              name="desc"
              value={this.state.desc}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Rating
            <input
              type="number"
              placeholder="Rating"
              name="rating"
              value={this.state.description}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Brand
            <input
              type="text"
              placeholder="Brand"
              name="brand"
              value={this.state.brand}
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
          <input type="submit" value="Submit!" />
        </form>
        {this.state.fireRedirect
          ? <Redirect push to={`/ice-cream/${this.state.newId}`} />
          : ''}
      </div>
    );
  }
}

export default TvShowAddForm;

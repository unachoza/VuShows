import React, { Component } from 'react'
import axios from 'axios'

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get(`https://api.themoviedb.org/3/search/tv?api_key=43caac628b4f73785a588143ec291dbe&language=en-US&query={search}&page=1`)
      .then(({ data }) => {
        this.setState({
          results: data.data
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search here"
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
      </form>
    )
  }
}

export default Search

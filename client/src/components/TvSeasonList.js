import React, { Component } from 'react';

class TvSeasonList extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: [],
        bigdata: [],
        isLoading: false
      }
    }

  componentDidMount() {
    let showid = this.props.tvshow.showid
    // let seasons = this.props.tvshow.seasons
    let seasonnumber = 1
    fetch(`https://api.themoviedb.org/3/tv/${showid}/season/${seasonnumber}?api_key=43caac628b4f73785a588143ec291dbe&language=en-US`)
      .then(response => response.json())
      .then(data => this.setState({ data }));
    fetch(`https://api.themoviedb.org/3/tv/${showid}?api_key=43caac628b4f73785a588143ec291dbe&language=en-US`)
      .then(response => response.json())
      .then(bigdata => this.setState({ bigdata }));
  }

  render() {
    console.log(this.state.data.name)
    return (
    <footer>
      Season List going here
      <br /> Number of seasons: &nbsp;
      {this.state.bigdata.number_of_seasons}
    </footer>
    )
  }
}

export default TvSeasonList;
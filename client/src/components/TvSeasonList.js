import React, { Component } from 'react';
import TvSeason from './TvSeason';
import TvEpisode from './TvEpisode';

class TvSeasonList extends Component {
  constructor() {
      super()
      this.state = {
        episodedata: [],
        seasondata: [],
        seasonnumber: 1,
        needsLoading: true
      }

      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    let showid = this.props.tvshow.showid
    fetch(`https://api.themoviedb.org/3/tv/${showid}?api_key=43caac628b4f73785a588143ec291dbe&language=en-US`)
      .then(response => response.json())
      .then(seasondata => this.setState({ seasondata }));
  }

  handleClick(e){
    console.log('clicked!')
    this.renderTvEpisodes()
    let str = e.target.name
    let str2 = str.substr(7)
    this.setState(prevState => ({
      needsLoading: true,
      seasonnumber: str2
    }));
  }

  renderTvSeasons() {
    if (this.state.seasondata.seasons) {
      return this.state.seasondata.seasons.map(tvshow => {
        return (
          <div>
          <TvSeason key={tvshow.id} tvshow={tvshow} />
          <button name={tvshow.name} onClick={(e) => this.handleClick(e)}>Display Episodes</button>
          </div>
        );
      });
    } else return <p>Loading Seasons...</p>
  }

  renderTvEpisodes(){
    // console.log(this.state.needsLoading, 'before render')
    let showid = this.props.tvshow.showid
    let seasonnumber = this.state.seasonnumber
    if (this.state.needsLoading) {
        this.setState(prevState => ({
          needsLoading: false
        }))
      fetch(`https://api.themoviedb.org/3/tv/${showid}/season/${seasonnumber}?api_key=43caac628b4f73785a588143ec291dbe&language=en-US`)
        .then(response => response.json())
        .then(episodedata => this.setState({ episodedata })
        );
    }
    if(this.state.episodedata.episodes) {
      return this.state.episodedata.episodes.map(episodes => {
        return (
          <div>
          <TvEpisode key={episodes.id} episodes={episodes}/>
          </div>
        );
      });

    } else return <p>Loading Episodes...</p>
}

  render() {
    return (
    <div>
    <div>
    Number of seasons: &nbsp;
    {this.state.seasondata.number_of_seasons}
    </div>
    <footer>
      {this.renderTvSeasons()}
    </footer>
    <div>
      {this.renderTvEpisodes()}
    </div>
    </div>
    )
  }
}

export default TvSeasonList;

import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      faves: [],
      searchResults: [],
      currentShow: [],
      focus: 'faves',
      focusHistory: []
    };
    this.search = this.search.bind(this);
    this.toggleFaves = this.toggleFaves.bind(this);

    this.handleBack = this.handleBack.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
    this.getShowInfo = this.getShowInfo.bind(this);
    this.getEpisodes = this.getEpisodes.bind(this);
    this.addFave = this.addFave.bind(this);
    this.removeFave = this.removeFave.bind(this);
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState(prevState => ({
      user
    }));
    this.getFaves();
  }

  getFaves() {
    const token = this.props.token;
    axios.get(`/db/faves/${token}`)
      .then(res => {
        const faves = res.data.data;
        let current = 0;
        const getEpisodes = () => {
          axios.get(`/db/ep/${faves[current].id}/${token}`)
            .then(data => {
              faves[current].episode_list = data.data.data;
              current += 1;
              if (current < faves.length) getEpisodes();
            })
            .catch(err => console.log(err));
        };
        getEpisodes();
        this.setState(prevState => ({
          faves
        }));
      })
      .catch(err => console.log(err));
  }

  toggleFaves() {
    const focus = 'faves'
    this.setState(prevState => ({
      focus,
      focusHistory: [...prevState.focusHistory, this.state.focus],
    }));
  }

  search(str) {
    if (str) {
      axios.get(`/db/external/search/${str}`)
        .then(res => {
          const searchResults = res.data.results.map(d => {
            return ({
              isFave: (this.state.faves.findIndex(v => v.db_id === d.id) >= 0 ? true : false),
              db_id: d.id,
              title: d.original_name,
              year: d.first_air_date.slice(0, 4),
              img: (d.poster_path ? 'https://image.tmdb.org/t/p/w500' + d.poster_path : '#')
            });
          });
          this.setState(prevState => ({
            searchResults, focus: 'search'
          }));
        })
        .catch(err => console.log(err));
    };
  }

  handleShowClick(db_id) {
    const favesIndex = this.state.faves.findIndex(p => p.db_id === db_id);
    if (favesIndex > -1) {
      this.setState(prevState => ({
        currentShow: this.state.faves[favesIndex],
        focus: 'faveShow',
        focusHistory: [...prevState.focusHistory, this.state.focus],
      }));
    } else {
      this.getShowInfo(db_id);
      this.setState(prevState => ({
        currentShow: [],
        focus: 'show',
        focusHistory: [...prevState.focusHistory, this.state.focus],
      }));
    };
  }

  getShowInfo(db_id) {
    axios.get(`/db/external/show/${db_id}`)
      .then(res => {
        const d = res.data;
        return ({
          db_id: d.id,
          title: d.original_name,
          summary: d.overview,
          air_start: d.first_air_date,
          air_end: d.last_air_date,
          popularity: d.popularity,
          rating: d.vote_average,
          img: (d.poster_path ? 'https://image.tmdb.org/t/p/w500' + d.poster_path : '#'),
          img_bg: (d.backdrop_path ? 'https://image.tmdb.org/t/p/w500/' + d.backdrop_path : '#'),
          network: (d.networks.length ? d.networks.map(f => f.name).toString() : null),
          seasons: (d.number_of_seasons ? d.number_of_seasons : 0),
          episodes: (d.number_of_episodes ? d.number_of_episodes : 0)
        });
      })
      .then(show => {
        axios.post(`/db/${this.props.token}`, show)
          .then(res => {
            const currentShow = res.data.data;
            this.getEpisodes(currentShow)
            this.setState(prevState => ({
              currentShow
            }));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  getEpisodes(show) {
    const id = show.id;
    const seasons = show.seasons;
    let episodes = [];
    for (let i = 1; i <= seasons; i++) {
      axios.get(`/db/external/show/${show.db_id}/season/${i}`)
        .then(res => {
          res.data.episodes.forEach(d => {
            const episode = {
              db_id: d.show_id,
              db_episode_id: d.id,
              name: d.name,
              summary: d.overview,
              season: d.season_number,
              episode: d.episode_number,
              air_date: d.air_date,
              rating:  d.vote_average,
              img: (d.still_path ? 'https://image.tmdb.org/t/p/w500' + d.still_path : '#')
            };
            if (episode) episodes.push(episode);
          });
          return episodes;
        })
        .then(episodes => {
          if (episodes.length === show.episodes) {
            const currentShow = this.state.currentShow;
            currentShow.episode_list = episodes;
            this.setState(prevState => ({
              currentShow
            }));
            let current = 0;
            const upload = (episodes) => {
              axios.post(`/db/ep/${id}/${this.props.token}`, episodes[current])
              .then(res => {
                current += 1;
                if (current < episodes.length) upload(episodes);
              })
              .catch(err => console.log(err));
            };
            upload(episodes);
          };
        })
        .catch(err => console.log(err));
    };
  }

  addFave(show_id) {
    axios.post(`/db/faves/${this.props.token}`, {
      show_id: show_id
    })
      .then(res => {
        this.getFaves();
        this.setState(prevState => ({
          focus: 'search'
        }))
      })
      .catch(err => console.log(err));
  }

  removeFave(fave_id) {
    axios.delete(`/db/faves/${fave_id}/${this.props.token}`)
      .then(res => {
        this.getFaves();
        this.setState(prevState => ({
          focus: false
        }));
      })
      .catch(err => console.log(err));
  }

  handleBack() {
    const history = this.state.focusHistory;
    const focus = history[history.length - 1];
    const focusHistory = history.slice(0, -1);
    this.setState(() => ({
      focus, focusHistory
    }));
  }


  render() {
    const { focus } = this.state;
    // console.log(this.state.faves)

    return (
      <div>
        <Header focus={focus} search={this.search} toggleFaves={this.toggleFaves}/>
        <Body
          focus={focus}
          faves={this.state.faves}
          searchResults={this.state.searchResults}
          currentShow={this.state.currentShow}
          handleShowClick={this.handleShowClick}
          getShowInfo={this.getShowInfo}
          getEpisodes={this.getEpisodes}
          handleAddFave={this.addFave}
          handleRemoveFave={this.removeFave}
        />
        <Footer handleLogout={this.props.handleLogout} handleBack={this.handleBack}/>
      </div>
    );
  }
}

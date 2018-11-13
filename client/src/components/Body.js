import React, { Component } from 'react';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import Favorites from './Favorites.js';
import SearchResults from './SearchResults.js';
import Show from './Show.js';
import FaveShow from './FaveShow.js';

export default class Body extends Component {

  componentDidMount() {
    this.body = document.querySelector('.body');
    disableBodyScroll(this.body);
  }

  handleFocus(focus) {
    switch(focus) {
      case 'search' :
        return <SearchResults data={this.props.searchResults} handleShowClick={this.props.handleShowClick} />
      case 'show' :
        return <Show data={this.props.currentShow} handleAddFave={this.props.handleAddFave} />
      case 'faveShow' :
        return <FaveShow data={this.props.currentShow} handleRemoveFave={this.props.handleRemoveFave} />
      // case 'episode' :
      //   return <ShowEpisodes data={} />
      default :
        return <Favorites data={this.props.faves} getEpisodes={this.props.getEpisodes} handleShowClick={this.props.handleShowClick} handleRemoveFave={this.props.handleRemoveFave}/>
    }
  }

  render() {
    return (
      <div className='body'>
        {this.handleFocus(this.props.focus)}
      </div>
    );
  }
}

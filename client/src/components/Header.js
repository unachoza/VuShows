import React, { Component } from 'react';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: '',
      showSearch: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showFaves = this.showFaves.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

  handleChange(e) {
    const searchStr = e.target.value;
    this.setState(prevState => ({
      searchStr
    }));
  }

  handleSubmit(e) {
    document.getElementById('search-box').blur();
    e.preventDefault();
    this.props.search(this.state.searchStr);
  }

  showSearch() {
    const searchStr = this.state.searchStr;
    const showSearch = this.state.showSearch;
    if (!showSearch) {
      this.setState(prevState => ({
        searchStr: '',
        showSearch: true
      }));
    } else if (showSearch && searchStr) {
      this.setState(prevState => ({
        searchStr: ''
      }));
      document.getElementById('search-box').focus();
    } else {
      this.setState(prevState => ({
        showSearch: false
      }));
    };
  }

  showFaves() {
    this.setState(prevState => ({
      showSearch: false
    }));
    this.props.toggleFaves();
  }

  searchBox() {
    if (this.state.showSearch) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input autoFocus
            id='search-box'
            type='text'
            placeholder='search...'
            value={this.state.searchStr}
            onChange={this.handleChange}
          />
        </form>
      );
    } else return null;
  }

  render() {
    return(
      <div className='header'>
        <div className='header-side'>
          <div className='icon logo' onClick={this.showFaves}/>
        </div>
        <div className='header-center'>
          {this.searchBox()}
        </div>
        <div className='header-side'>
          <div className='icon magnifier' onClick={this.showSearch}/>
        </div>
      </div>
    );
  }
}

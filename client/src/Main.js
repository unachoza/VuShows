import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import TvShowList from './components/TvShowList.js';
import TvShowSingle from './components/TvShowSingle.js';
import TvShowAddForm from './components/TvShowAddForm.js';
import TvShowEditForm from './components/TvShowEditForm.js';


class Main extends Component {
  render() {
    return (
       <Router>
        <div className="App">
          <Header />
          <div className="container">
          <Switch />
          <Route exact path='/' component={Login} />
          <Route exact path='/tv-show' component={TvShowList} />
          <Route exact path="/tv-show/:id" component={TvShowSingle} />
          <Route exact path="/add" component={TvShowAddForm} />
          <Route exact path="/edit/:id" component={TvShowEditForm} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default Main;

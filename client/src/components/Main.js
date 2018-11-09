import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import Login from './Login';
import TvShowList from './TvShowList.js';
import TvShowSingle from './TvShowSingle.js';
import TvShowAddForm from './TvShowAddForm.js';
import TvShowEditForm from './TvShowEditForm.js';


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

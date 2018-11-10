import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './Header';
import Footer from './Footer';
import TvShowList from './TvShowList.js';
import TvShowSingle from './TvShowSingle.js';
import TvShowAddForm from './TvShowAddForm.js';
import TvShowEditForm from './TvShowEditForm.js';

// const token = this.props.token
// axios.get(`/db/${token}/`)
//const token = this.props.token
//   axios.get(`/db/${token}/`)

class Main extends Component {


  getInfo() {
    console.log('hello')
    let base = "https://api.themoviedb.org/3/search/tv"
    axios.get(`${base}?api_key=43caac628b4f73785a588143ec291dbe&language=en-US&query=${this.state.query}&page=1`)
    .then((data) => {
        console.log(data)
        this.setState({
            results: data.data.results,
            show: true,

        })
        console.log(this.state.results)
    })
    .then(() => console.log(this.state.results))
}

// token ={this.props.token}

  render() {
    console.log(this.props.token)
    return (
       <Router>
        <div className="App">
          <Header
            getInfo = {this.getInfo}
          />
          <div className="container">
          <Switch />
          {/* passed token here  */}
          <Route exact path='/tv-show' render={(props) => <TvShowList {...props} token={this.props.token} />} />}
          {/* passed token here  */}
          <Route exact path="/tv-show/:id" render={(props) => <TvShowSingle {...props} token={this.props.token} />} />}
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

import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import CreateUser from './components/CreateUser.js';
import Login from './components/Login.js';
import Main from './components/Main.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      valid: false,
      user: null,
      message: null,
      focus: 'loading'
    };
    this.checkToken = this.checkToken.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    this.checkToken();
  }

  checkToken() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token) {
      this.setState(prevState => ({
        focus: 'login'
      }));
    } else {
      axios.post('/db/token', {
        token: token
      })
        .then(res => {
          const valid = res.data.status;
          const focus = valid ? false : 'login';
          this.setState(prevState => ({
            token, valid, user, focus
          }));
          if (!valid) localStorage.clear();
        })
        .catch(err => {
          this.setState(prevState => ({
            focus: 'login'
          }));
        });
    };
  }

  handleLogin(user, pass) {
    axios.post('/db/login', {
      username: user,
      password: pass
    })
      .then(res => {
        const token = res.data.token;
        const message = !token ? res.data.message : '';
        const focus = token ? false : this.state.focus;
        localStorage.setItem('token', token);
        localStorage.setItem('user', user);
        this.setState(prevState => ({
          token, user, message, focus
        }));
        if (token) {
          this.checkToken();
        }
      })
      .catch(err => console.log(err));
  }

  handleLogout() {
    const token = this.state.token
    axios.post('/db/logout', {
      token: token
    })
      .then(res => {
        const token = null;
        const valid = false;
        const user = null;
        const message = res.data.message;
        const focus = 'login';
        this.setState(prevState => ({
          token, valid, user, message, focus
        }));
        localStorage.clear();
      })
      .catch(err => console.log(err));
  }

  handleNewUser(user, pass) {
    axios.post('/db/newuser', {
      username: user,
      password: pass
    })
      .then(res => {
        const status = res.data.status;
        const message = res.data.message;
        const focus = status ? 'login' : this.state.focus;
        this.setState(prevState => ({
          user, message, focus
        }));
      })
      .catch(err => console.log(err));
  }

  handleFocus(focus, message) {
    this.setState(prevState => ({
      focus, message
    }));
  }

  showFocus(focus) {
    switch(focus) {
      case 'loading' :
        return <div>Loading...</div>
      case 'login' :
        return <Login handleLogin={this.handleLogin} createLogin={() => this.handleFocus('createAccount', '')}/>;
      case 'createAccount' :
        return <CreateUser handleNewUser={this.handleNewUser} handleFocus={this.handleFocus}/>;
      default :
        return <Main user={this.state.user} token={this.state.token} handleLogout={this.handleLogout}/>;
    }
  }

  render() {
    const { focus } = this.state;
    return (
      <div>
        <div>
          {this.showFocus(focus)}
        </div>
        <div>
          {this.state.message}
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

export default class CreateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      password2: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.password2) {
      this.props.handleNewUser(this.state.username, this.state.password);
    } else {
      this.props.handleFocus('createAccount', 'Passwords Must Match')
    }
  }

  handleChangeForm(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    return (
      <div className='login'>
        <div className='login-header'>
          <div className='icon logo'/>
        </div>
        <div className='login-form'>
          <h1>Create Account:</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              name='username'
              type='text'
              placeholder='username'
              value={this.state.username}
              onChange={this.handleChangeForm}
            />
            <input
              name='password'
              type='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleChangeForm}
            />
            <input
              name='password2'
              type='password'
              placeholder='retype password'
              value={this.state.password2}
              onChange={this.handleChangeForm}
            />
            <button>submit</button>
          </form>
        </div>
        <div className='login-message'>
          <p>{this.props.message}</p>
        </div>
        <div className='login-footer'>
          <button onClick={() => this.props.handleFocus('login', '')}>cancel</button>
        </div>
      </div>
    );
  }
}

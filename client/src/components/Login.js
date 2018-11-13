import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.username, this.state.password);
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
            <button>enter</button>
          </form>
        </div>
        <div className='login-message'>
          <p>{this.props.message}</p>
        </div>
        <div className='login-footer'>
          <h6>No Account?</h6>
          <button onClick={this.props.createLogin}>click here</button>
        </div>
      </div>
    );
  }
}

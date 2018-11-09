import React, { Component } from 'react';

class Login extends Component {
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
      <div>
        <p>Log In:</p>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            name='username'
            type='text'
            placeholder='username'
            value={this.state.username}
            onChange={this.handleChangeForm}
          />
          <br />
          <input
            name='password'
            type='password'
            placeholder='password'
            value={this.state.password}
            onChange={this.handleChangeForm}
          />
          <br /><br />
          <button>enter</button>
        </form>
        <div>
          <button onClick={this.props.createLogin}>create account</button>
        </div>
      </div>
    );
  }
}

export default Login;

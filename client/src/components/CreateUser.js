import React, { Component } from 'react';

class CreateUser extends Component {
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
      this.props.handleFocus('createAccount', 'Passwords Must Match.')
    }
  }

  handleChangeForm(e) {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render() {
    return (
      <div>
        <p>Create User Account:</p>
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
          <br />
          <input
            name='password2'
            type='password'
            placeholder='retype password'
            value={this.state.password2}
            onChange={this.handleChangeForm}
          />
          <br /><br />
          <button>submit</button>
        </form>
      </div>
    );
  }
}

export default CreateUser;

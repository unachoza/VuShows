import React from 'react';

const Home = () => {
  return (
    <div className="home">
      <h1>Tv Abstraction </h1>
    <p>The tv data you want to know!</p>
    <div className="add">

<form onSubmit={(e) => this.handleFormSubmit(e)}>
  <label>
    Login!
    <input
      type="text"
      placeholder="User Name"
      name="userName"
      //value={this.state.userName}
      onChange={(e) => this.handleInputChange(e)}
    />
  </label>
  <label>
    
    <input
      type="text"
      placeholder="Password"
      name="desc"
      //value={this.state.desc}
      onChange={(e) => this.handleInputChange(e)}
    />
  </label>
  <input type="submit" value="Enter" />
</form>
{/* {this.state.fireRedirect
  ? <Redirect push to={`/ice-cream/${this.state.newId}`} />
  : ''} */}
</div>
    </div>
  )
}

export default Home;

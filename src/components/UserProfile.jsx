import React, { Component } from "react";

class UserProfile extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1>this is your user profile</h1>
          <h2>HELLO USER</h2>
          <h1># of BEERS TRIED</h1>
          <h1># of BEERS REVIEWED</h1>
          <h1>AVERAGE RATING OF ALL BEERS TRIED</h1>
        </div>
      </div>
    );
  }
}

export default UserProfile;

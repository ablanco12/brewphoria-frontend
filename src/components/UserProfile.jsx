import React, { Component } from "react";
import UserInfo from "./UserInfo";

class UserProfile extends Component {
  state = {};
  render() {
    return (
      <div>
        <div className="jumbotron">
          <UserInfo />
        </div>
        <div className="jumbotron">
          <h1>BEERS ></h1>

          <h1>AVERAGE RATING OF ALL BEERS TRIED</h1>
        </div>
      </div>
    );
  }
}

export default UserProfile;

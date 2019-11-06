import React, { Component } from "react";

class UserInfo extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <h3>user photo</h3>
        </div>
        <div>
          <h1>beers tried</h1>
          <h1>52</h1>
        </div>
        <div>
          <h3>average review</h3>
          <h1>4.5</h1>
        </div>
      </div>
    );
  }
}

export default UserInfo;

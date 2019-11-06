import React, { Component } from "react";
import UserInfo from "./UserInfo";

class UserInfoContainer extends Component {
  state = {};
  render() {
    return (
      <div className="master-detail-element sidebar">
        <UserInfo />
      </div>
    );
  }
}

export default UserInfoContainer;

import React, { Component } from "react";
// import SearchBar from "./SearchBar";
import { Form, Button } from "react-bootstrap";

class Home extends Component {
  state = {};
  render() {
    return (
      <div className="login-form">
        {/* <SearchBar /> */}
        <div className="login-input">
          <Form className="jumbotron">
            <div className="member-login">
              <h2>Member Login</h2>
            </div>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={this.props.login.username}
                onChange={this.props.handleLoginChange}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="dark" onClick={this.props.handleClick}>
              Log in
            </Button>
            <Button variant="dark" href="/signup">
              Sign up
            </Button>
          </Form>
        </div>

        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
        <div className="jumbotron">
          <h1>SOMETHING GOES HERE!</h1>
        </div>
      </div>
    );
  }
}

export default Home;

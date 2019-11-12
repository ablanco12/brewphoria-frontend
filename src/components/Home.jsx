import React, { Component } from "react";
// import SearchBar from "./SearchBar";
import { Form, Button } from "react-bootstrap";
import Logo from "./Logo";

class Home extends Component {
  state = {
    showLogin: false
  };

  loginForm = () => {
    this.setState({
      showLogin: true
    });
  };
  render() {
    return (
      <div>
        <div>{!this.state.showLogin && <Logo />}</div>
        <br />
        {this.state.showLogin && (
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
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.props.login.password}
                    onChange={this.props.handleLoginChange}
                  />
                </Form.Group>

                <Button variant="dark" onClick={this.props.handleClick}>
                  Log in
                </Button>
                <Button variant="dark" href="/signup">
                  Sign up
                </Button>
              </Form>
            </div>
          </div>
        )}
        <br />
        <br />
        <br />
        <br />
        <br />
        {!this.state.showLogin && (
          <Button onClick={this.loginForm}>LOGiN or SiGNUP</Button>
        )}
      </div>
    );
  }
}

export default Home;

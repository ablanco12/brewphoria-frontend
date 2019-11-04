import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class SignUpPage extends Component {
  render() {
    const { handleSubmit, handleChange, accounts } = this.props;
    console.log(this.props);
    return (
      <div className="jumbotron">
        <h1>Sign up</h1>
        <div className="md-flex">
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                id="username"
                placeholder="Enter username"
                onChange={handleChange}
                value={accounts.username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                value={accounts.password}
              />
            </Form.Group>
            <Button color="dark">Create Account</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignUpPage;

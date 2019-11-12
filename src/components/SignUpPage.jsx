import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class SignUpPage extends Component {
  state = {};

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
                placeholder="Enter Username"
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
            <Form.Group>
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                id="password"
                placeholder="Password Confirmation"
                onChange={handleChange}
                value={accounts.password_confirmation}
              />
            </Form.Group>
            <Button type="submit" color="dark">
              Create Account
            </Button>
          </Form>
          have an account ? COOL!
          <br />
          <Link to="/home" color="orange">
            LOG IN
          </Link>
          {/* <div>
            <button onClick={this.onOpenModal}>Open modal</button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <h2>Simple centered modal</h2>
            </Modal>
          </div> */}
        </div>
      </div>
    );
  }
}

export default SignUpPage;

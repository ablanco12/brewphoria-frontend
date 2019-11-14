import React, { Component } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};

  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand className="brand-logo" href="/home">
            BrewPhoria
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <br />
              {this.props.loggedin && (
                <NavDropdown title="Beers & Breweries" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/searchBeers">
                    All Beers
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/searchBreweries">
                    All Breweries
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {!this.props.loggedin && <Link to="/home">Login</Link>}

              {this.props.loggedin && (
                <Nav.Link
                  href="/profile"
                  className="link"
                  // onClick={event => this.props.fetchBeersTried(event)}
                >
                  Your Profile
                </Nav.Link>
              )}
            </Nav>

            {this.props.loggedin ? (
              <div className="brand-logo1">
                logged in as: {localStorage.getItem("username")}
              </div>
            ) : (
              <div className="please-login">please log in </div>
            )}
            {this.props.loggedin && (
              <Button onClick={this.props.handleClickLogout}>Logout</Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;

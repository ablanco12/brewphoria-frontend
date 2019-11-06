import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/profile">Your Profile</Nav.Link>
              <NavDropdown title="Beers & Breweries" id="basic-nav-dropdown">
                <NavDropdown.Item href="/searchBeers">
                  All Beers
                </NavDropdown.Item>
                <NavDropdown.Item href="/searchBreweries">
                  All Breweries
                </NavDropdown.Item>
                {/* <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;

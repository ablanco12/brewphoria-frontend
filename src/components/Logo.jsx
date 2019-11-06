import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { fadeInDown } from "react-animations";
import "../Logo.css";

const Bounce = styled.div`
  animation: 4s ${keyframes`${fadeInDown}`} infinite;
`;

class Logo extends Component {
  state = {};
  render() {
    return (
      <p>
        <Bounce>
          <span>BrewPhoria</span>
        </Bounce>
        <h3 className="beer30">&mdash; it's beer:30 somewhere &mdash;</h3>
      </p>
    );
  }
}

export default Logo;

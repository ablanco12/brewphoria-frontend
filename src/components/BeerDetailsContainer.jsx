import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Review from "./Review";

class BeerDetailsContainer extends Component {
  state = {};

  render() {
    console.log(this.props.beerClicked);
    const beer = this.props.beerClicked;
    return (
      <Container>
        <Row>
          <Col>
            <div className="jumbotron">
              <h1 className="beerTitle">{beer.name}</h1>
              <br />
              <img src={beer.image_url} alt="oh no" width="50%" height="50%" />
              <br />
              <button className="cheers-btn">CHEERS!</button>
            </div>
          </Col>
          <Col>
            <div className="jumbotron">
              <h1 className="beerStyle">{beer.style}</h1>
              <h3 className="beerAbv">{beer.abv} % ALC</h3>
              <h3 className="beerIbu">{beer.description}</h3>
              <Review
                beer={beer}
                beerReview={this.props.beerReview}
                handleReviewBeer={this.props.handleReviewBeer}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BeerDetailsContainer;

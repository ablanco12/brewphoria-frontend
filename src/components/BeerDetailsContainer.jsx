import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Review from "./Review";

class BeerDetailsContainer extends Component {
  state = {};
  render() {
    const beer = this.props.beerClicked;
    // const text = this.props.cheered ? "cheered" : "haven't cheered";
    // const label = this.props.cheered ? "CHEERED! 🍻" : "CHEERS! 🍺";

    return (
      <Container>
        <Row>
          <div className="jumbotron">
            <Col>
              <h1 className="beerTitle">{beer.name}</h1>
              <br />
              <img src={beer.image_url} alt="oh no" />
              <br />

              {/* <button
                className="cheers-btn"
                onClick={() => this.props.handleCheers(beer)}
              >
                {label}
              </button>
              <h6>you {text} this. Click to toggle.</h6> */}
            </Col>

            <Col>
              <h1 className="beerStyle">{beer.style}</h1>
              <h3 className="beerAbv">{beer.abv} % ABV</h3>
              <h3 className="beerIbu">{beer.description}</h3>

              <Review
                beer={beer}
                onStarClick={this.props.onStarClick}
                rating={this.props.rating}
                handleReviewBeer={this.props.handleReviewBeer}
                fetchPostReviews={this.props.fetchPostReviews}
              />
            </Col>
          </div>
        </Row>
      </Container>
    );
  }
}

export default BeerDetailsContainer;

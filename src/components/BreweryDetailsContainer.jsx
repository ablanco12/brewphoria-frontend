import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class BreweryDetailsContainer extends Component {
  state = {};
  render() {
    const brewery = this.props.breweryClicked;
    console.log(this.props);
    return (
      <Container>
        <Row>
          <Col>
            <div className="jumbotron">
              <h1 className="beerTitle">{brewery.name}</h1>
              <br />
              <img className="brewery" src={brewery.image_url} alt="oh no" />
              <br />
              <br />
            </div>
            <div>
              {/* {this.props.beerData.map(beer => {
                <li>{beer.brewery_id}</li>;
              })} */}
            </div>
          </Col>
          <Col>
            <div className="jumbotron">
              <h1 className="beerStyle">{brewery.location}</h1>

              <Form>
                <FormGroup>
                  <Label for="review">Leave a Review!</Label>
                  <Input type="textarea" name="text" id="text" />
                </FormGroup>
                <Button>Submit</Button>
              </Form>

              <Link to={`/searchBreweries`}>Go Back</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BreweryDetailsContainer;

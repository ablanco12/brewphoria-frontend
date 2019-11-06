import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Review extends Component {
  state = {
    review: false,
    beerReview: ""
  };

  handleAddReview = input => {
    console.log(input);
    this.setState({
      beerReview: input,
      review: true
    });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <Form>
          <FormGroup>
            <Label for="review">Leave a Review!</Label>
            <Input
              type="textarea"
              name="text"
              id="text"
              value={this.props.beerReview}
              onChange={event => this.props.handleReviewBeer(event)}
            />
          </FormGroup>
          <Button onClick={() => this.handleAddReview(this.props.beerReview)}>
            Submit
          </Button>
        </Form>
        <Button>
          <Link to={`/searchBeers`}>Go Back</Link>
        </Button>
        <br />
        {this.state.review && (
          <ul>
            <li>{this.state.beerReview}</li>
          </ul>
        )}
      </div>
    );
  }
}

export default Review;

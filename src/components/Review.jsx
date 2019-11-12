import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

class Review extends Component {
  state = {};

  render() {
    const reviews = this.props.beer.reviews ? this.props.beer.reviews : [];
    // console.log(reviews);
    const username = localStorage.getItem("username");
    const reviewMapped =
      reviews.length > 0 ? (
        reviews.map(b => (
          <div className="reviews" key={b.id}>
            <h5>{username}</h5>
            {b.content}
            <br />
            Rated: {b.rating} stars
          </div>
        ))
      ) : (
        <h1> you haven't reviewed this beer yet!</h1>
      );

    const { rating } = this.props.rating;
    return (
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.props.onStarClick.bind(this)}
        />
        <Form onSubmit={this.props.fetchPostReviews}>
          <FormGroup>
            <Label for="review">Leave a Review!</Label>
            <Input
              type="textarea"
              name="text"
              id="text"
              onChange={event => this.props.handleReviewBeer(event)}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <Link to={`/searchBeers`}>Go Back</Link>
        <br />
        <Link to={`/profile`}>Go to your profile</Link>
        <div className="reviews">{reviewMapped}</div>
      </div>
    );
  }
}

export default Review;

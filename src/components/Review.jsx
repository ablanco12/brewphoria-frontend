import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";

class Review extends Component {
  state = {
    usersData: {}
  };
  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    fetch(
      `http://localhost:3000/api/v1/users/${localStorage.getItem("user_id")}`
    )
      .then(resp => resp.json())
      .then(user => {
        console.log("one user", user);
        this.setState({
          usersData: user
        });
      });
  };
  render() {
    const reviews = this.props.beer.reviews ? this.props.beer.reviews : [];
    console.log(reviews);
    console.log(this.props.beer);

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
        <div className="reviews">
          {reviews &&
            reviews.map(b => (
              <div>
                <b>{b.username}</b>:{b.content}
                <br />
                Rated: {b.rating}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Review;

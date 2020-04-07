import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import StarRatingComponent from "react-star-rating-component";
import Media from "react-bootstrap/Media";

class Review extends Component {
  state = {
    usersData: {}
  };
  componentDidMount() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser = () => {
    fetch(
      `https://brewphoria-api.herokuapp.com/api/v1/users/${localStorage.getItem(
        "user_id"
      )}`
    )
      .then(resp => resp.json())
      .then(user => {
        this.setState({
          usersData: user
        });
      });
  };
  render() {
    const reviews = this.props.beer.reviews ? this.props.beer.reviews : [];

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
        <Media>
          <Media.Body>
            {reviews &&
              reviews.map(b => (
                <div key={b.id}>
                  <b>{b.username}</b>:<h5>{b.content}</h5>
                  Rated: {b.rating}
                </div>
              ))}
          </Media.Body>
        </Media>
      </div>
    );
  }
}

export default Review;

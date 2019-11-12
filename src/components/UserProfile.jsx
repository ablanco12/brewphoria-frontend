import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUploadComponent";

class UserProfile extends Component {
  state = {};
  render() {
    const allBeersTried = this.props.cheered;
    // console.log(this.props);
    const username = localStorage.getItem("username");
    const reviewsMapped =
      allBeersTried.length > 0 ? (
        allBeersTried.map(b => (
          <li key={b.id}>
            <img src="..." class="mr-3" alt="..." />
            {b.content}
            <br />
            Rated: {b.rating} stars
          </li>
        ))
      ) : (
        <h1> you haven't reviewed or tried any beers yet!</h1>
      );
    console.log(allBeersTried);
    return (
      <div>
        <div className="jumbotron">
          Welcome {username} !
          <div>
            <ImageUpload onDrop={this.props.onDrop} />

            <div>
              <h1>beers tried</h1>
              <h1>{allBeersTried.length}</h1>
            </div>
          </div>
          <Link to="/searchBeers">all beers</Link>
          <br />
          <Link to="/searchBreweries">all breweries</Link>
        </div>
        <div className="jumbotron">
          <h1>ALL BEERS TRIED</h1>
          <div class="media">
            <div className="media-body">
              <h5 className="mt-0">beers you've reviewed..</h5>
              {reviewsMapped}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;

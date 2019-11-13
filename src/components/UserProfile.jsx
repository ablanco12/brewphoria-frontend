import React, { Component } from "react";
import { Link } from "react-router-dom";
import ImageUpload from "./ImageUploadComponent";

class UserProfile extends Component {
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
    console.log(this.state.usersData);
    // const allBeersTried = this.props.cheered
    // console.log(this.props);
    const username = localStorage.getItem("username");

    return (
      <div>
        <div className="jumbotron">
          Welcome {username} !
          <div>
            <ImageUpload onDrop={this.props.onDrop} />

            <div>
              <h1>beers tried</h1>
              {this.state.usersData.reviews && (
                <h1>{this.state.usersData.reviews.length}</h1>
              )}
            </div>
          </div>
          <Link to="/searchBeers">all beers</Link>
          <br />
          <Link to="/searchBreweries">all breweries</Link>
        </div>
        <div className="jumbotron">
          <h1>ALL BEERS TRIED</h1>
          <div className="media">
            <div className="media-body">
              <h5 className="mt-0">beers you've reviewed..</h5>
              {this.state.usersData.reviews &&
                this.state.usersData.reviews.map(b => (
                  <div className="reviews" key={b.id}>
                    <h5>{this.state.usersData.username}</h5>
                    {b.content}
                    <br />
                    Rated: {b.rating} stars
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;

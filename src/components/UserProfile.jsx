import React, { Component } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

class UserProfile extends Component {
  state = {
    usersData: [],
    beers: []
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
        console.log("one user", user); //user.beer_id
        this.setState({
          usersData: user
        });
      });
  };
  render() {
    console.log(this.state.usersData);
    console.log("all beers", this.props.beerData);
    // const allBeersTried = this.props.cheered
    // console.log(this.props);
    const username = localStorage.getItem("username");

    return (
      <Container>
        <Row>
          <Col>
            <div className="jumbotron">
              Welcome, {username} !
              <div>
                <img
                  src={`http://localhost:3000/${this.state.usersData.avatar}`}
                  alt="oh no"
                  className="profile-image"
                />
                <div>
                  <h1>beers tried</h1>
                  {this.state.usersData.reviews && (
                    <h1>{this.state.usersData.reviews.length}</h1>
                  )}
                </div>
              </div>
              <h6>go try some beers!</h6>
              <Link to="/searchBeers">all beers</Link>
              <br />
              <Link to="/searchBreweries">all breweries</Link>
            </div>
          </Col>
          <Col>
            <div className="jumbotron">
              <h1>ALL BEERS TRIED</h1>
              <div className="media">
                <div className="media-body">
                  <h5 className="mt-0">Recent Activity</h5>

                  <Alert variant="warning">
                    <h6>
                      {this.state.usersData.reviews &&
                        this.state.usersData.reviews.map(b => {
                          let singleBeer = { name: "No beers" };
                          if (b && this.props.beerData) {
                            singleBeer = this.props.beerData.find(
                              beer => beer.id === b.beer_id
                            );
                          }
                          return (
                            <div className="reviews" key={b.id}>
                              <br />
                              <Alert.Heading className="beer-name">
                                {singleBeer.name}
                              </Alert.Heading>
                              <br />
                              <img
                                style={{ height: "25%", width: "25%" }}
                                src={singleBeer.image_url}
                                alt="oh no"
                              />

                              <h4 className="mb-0">Rated: {b.rating} stars</h4>
                              {b.content}
                              <hr />
                            </div>
                          );
                        })}
                    </h6>
                  </Alert>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserProfile;

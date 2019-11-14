import React from "react";
// import logo from './logo.svg';
import Home from "./components/Home";
import SignUpPage from "./components/SignUpPage";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import BeerSearchResults from "./components/BeerSearchResults";
import BrewerySearchResults from "./components/BrewerySearchResults";
import BeerDetailsContainer from "./components/BeerDetailsContainer";
import BreweryDetailsContainer from "./components/BreweryDetailsContainer";
// import Image from 'react-bootstrap/Image'
import { Route, Switch, withRouter } from "react-router-dom";
import Modal from "react-responsive-modal";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    beerData: [],
    showTable: true,
    breweryData: [],
    beerClicked: [],
    cheered: [],
    open: false,
    rating: 0,
    breweryReview: "",
    breweryClicked: {},
    accounts: {
      username: "",
      password: "",
      password_confirmation: ""
    },
    login: {
      username: "",
      password: ""
    },
    loggedin: false,
    searchInput: "",
    avatar: []
  };
  componentDidMount() {
    this.fetchBeers();
    this.fetchBreweries();
  }

  fetchBeers = () => {
    fetch("http://localhost:3000/beers")
      .then(resp => resp.json())
      .then(data => {
        const lowercase = this.state.searchInput.toLowerCase();
        const filteredBeers = data.filter(data => {
          let beerName = data.name.toLowerCase();
          // ----- add more search options -----
          // let beerStyle = data.style.toLowerCase();
          return beerName.includes(lowercase);
        });
        console.log(filteredBeers);
        this.setState({
          beerData: filteredBeers,
          loggedin: true
        });
      });
  };

  fetchBreweries = () => {
    fetch("http://localhost:3000/breweries")
      .then(resp => resp.json())
      .then(breweryData => {
        const lowercaseBrewery = this.state.searchInput.toLowerCase();
        const filteredBreweries = breweryData.filter(brewery => {
          let breweryName = brewery.name.toLowerCase();
          return breweryName.includes(lowercaseBrewery);
        });
        this.setState({
          breweryData: filteredBreweries
        });
      });
  };

  // Avatar Handler

  fileHandler = event => {
    console.log(event.target);
    this.setState({
      avatar: event.target.files[0]
    });
  };

  // Create a User Handler

  handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();
    const currentAvatar = this.state.avatar;
    const { accounts } = this.state;
    const username = accounts.username;
    const password = accounts.password;
    const cPassword = accounts.password_confirmation;

    formData.append("avatar", currentAvatar);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("password_confirmation", cPassword);

    // console.log("this is the stuff you have on form", event);
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        Authorization: "Bearer"
      },
      body: formData
    })
      .then(resp => resp.json())
      .then(resp => {
        this.onOpenModal();
      });
  };

  handleClick = event => {
    // console.log("login", this.state.login);
    // console.log("thiis hits", event);
    event.preventDefault();
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: this.state.login.username,
          password: this.state.login.password
        }
      })
    };
    fetch(`http://localhost:3000/api/v1/login`, configObj)
      .then(resp => resp.json())
      .then(json => {
        // this.props.history.push("/home");
        window.localStorage.setItem("token", json.jwt);
        window.localStorage.setItem("username", json.user.username);
        window.localStorage.setItem("user_id", json.user.id);

        console.log("fetching after loggin in", json);
        this.setState({
          current_user: json.username,
          login: {
            username: "",
            password: ""
          },
          loggedin: true
        });
        this.props.history.push("/profile");
      });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    const accounts = { ...this.state.accounts };
    accounts[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ accounts });
  };

  handleLoginChange = event => {
    const login = { ...this.state.login };
    login[event.currentTarget.name] = event.currentTarget.value;
    this.setState({ login });
  };

  handleClickLogout = event => {
    event.preventDefault();
    localStorage.clear();
    this.setState({
      loggedin: false
    });
    this.props.history.push("/home");
  };

  searchNow = input => {
    this.setState({
      searchInput: input
    });
    this.fetchBeers();
    this.fetchBreweries();
  };

  handleClickedBeer = beerID => {
    // console.log("beer Clicked", beerID);
    fetch(`http://localhost:3000/beers/${beerID}`)
      .then(resp => resp.json())
      .then(beer => {
        this.setState({
          beerClicked: beer
        });
      });
  };

  handleClickedBrewery = breweryID => {
    // console.log("brewery Clicked", breweryID);
    fetch(`http://localhost:3000/breweries/${breweryID}`)
      .then(resp => resp.json())
      .then(brewery => {
        this.setState({
          breweryClicked: brewery
        });
      });
  };

  handleReviewBeer = event => {
    event.preventDefault();
    this.setState({
      beerContent: event.target.value
    });
  };

  fetchPostReviews = event => {
    event.preventDefault();
    const currentUser = localStorage.getItem("user_id");
    const currentUsername = localStorage.getItem("username");
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        review: {
          rating: this.state.rating,
          beer_id: this.state.beerClicked.id,
          content: this.state.beerContent,
          user_id: currentUser,
          username: currentUsername
        }
      })
    };
    fetch("http://localhost:3000/reviews", configObj)
      .then(resp => resp.json())
      .then(review => {
        fetch(`http://localhost:3000/beers/${this.state.beerClicked.id}`)
          .then(resp => resp.json())
          .then(beer => {
            // console.log(beer);
            console.log(review);
            this.setState({
              beerClicked: beer
            });
          });
        // this.fetchBeersTried();
      });
  };

  fetchBeersTried = () => {
    fetch("http://localhost:3000/reviews")
      .then(resp => resp.json())
      .then(review => {
        this.setState({
          cheered: review
        });
      });
  };

  onStarClick = nextValue => {
    console.log("RATED", nextValue);
    this.setState({ rating: nextValue });
  };

  // CHEERS
  // handleCheers = cheers => {
  //   console.log("cheers", cheers);
  //   const currentUser = localStorage.getItem("user_id");
  //   const postObj = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("token")
  //     },
  //     body: JSON.stringify({
  //       tried_beer: {
  //         user_id: currentUser,
  //         beer_id: this.state.beerClicked.id
  //       }
  //     })
  //   };
  //   fetch("http://localhost:3000/tried_beers", postObj)
  //     .then(resp => resp.json())
  //     .then(cheers => {
  //       console.log(cheers);
  //       // this.setState({
  //       //   cheered: cheers
  //       // });
  //     });
  // };

  render() {
    const { beerData, accounts, current_user } = this.state;
    const { open } = this.state;
    console.log(this.state.avatar);
    return (
      <div className="App">
        <NavBar
          handleClickLogout={this.handleClickLogout}
          loggedin={this.state.loggedin}
        />
        <Switch>
          <div className="paralax">
            <header className="App-header">
              <div className="login-form">
                {/* <Image className="App-header-bg" src="https://images.photowall.com/products/45025.jpg?h=699&q=85" fluid /> */}
                <Route
                  path="/home"
                  render={() => (
                    <Home
                      handleLoginChange={this.handleLoginChange}
                      handleClick={this.handleClick}
                      beerData={beerData}
                      accounts={accounts}
                      current_user={current_user}
                      login={this.state.login}
                    />
                  )}
                />

                <Route
                  path="/signup"
                  render={() => (
                    <SignUpPage
                      handleSubmit={this.handleSubmit}
                      handleChange={this.handleChange}
                      accounts={accounts}
                      fileHandler={this.fileHandler}
                    />
                  )}
                />
                <div>
                  {/* <button onClick={this.onOpenModal}>Open modal</button> */}
                  <Modal open={open} onClose={this.onCloseModal} center>
                    <h2>
                      Great! <br />
                      You've Successfully Created an Account! <br />
                      <Button href="/home" color="orange">
                        LOG IN
                      </Button>
                    </h2>
                  </Modal>
                </div>
                {/* return the amount of beers that have been reviewed/tried */}
                <Route
                  path="/profile"
                  render={() => (
                    <UserProfile
                      cheered={this.state.cheered}
                      beerClicked={this.state.beerClicked}
                      beerData={this.state.beerData}
                    />
                  )}
                />
                <Route
                  path="/searchBeers"
                  render={() => (
                    <BeerSearchResults
                      searchNow={this.searchNow}
                      showTable={this.state.showTable}
                      beerData={this.state.beerData}
                      beerClicked={this.state.beerClicked}
                      handleClickedBeer={this.handleClickedBeer}
                      breweryData={this.state.breweryData}
                      breweryClicked={this.state.breweryClicked}
                      beerReviews={this.state.beerReviews}
                      handleClickedBrewery={this.handleClickedBrewery}
                    />
                  )}
                />
                <Route
                  path="/searchBreweries"
                  render={() => (
                    <BrewerySearchResults
                      searchNow={this.searchNow}
                      beerData={this.state.beerData}
                      beerClicked={this.state.beerClicked}
                      handleClickedBeer={this.handleClickedBeer}
                      breweryData={this.state.breweryData}
                      breweryClicked={this.state.breweryClicked}
                      handleClickedBrewery={this.handleClickedBrewery}
                    />
                  )}
                />
                <Route
                  path="/beer"
                  render={() => (
                    <BeerDetailsContainer
                      handleReviewBeer={this.handleReviewBeer}
                      fetchPostReviews={this.fetchPostReviews}
                      beerClicked={this.state.beerClicked}
                      beerReview={this.state.beerReviews}
                      rating={this.state.rating}
                      onStarClick={this.onStarClick}
                      cheered={this.state.cheered}
                      
                    />
                  )}
                />
                <Route
                  path="/brewery"
                  render={() => (
                    <BreweryDetailsContainer
                      breweryClicked={this.state.breweryClicked}
                    />
                  )}
                />
              </div>
            </header>
          </div>
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

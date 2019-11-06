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
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    beerData: [],
    breweryData: [],
    beerClicked: {},
    beerReview: "",
    breweryReview: "",
    breweryClicked: {},
    accounts: {
      username: "",
      password: ""
    },
    login: {
      username: "",
      password: ""
    },
    loggedin: true,
    searchInput: ""
  };
  componentDidMount() {
    if (this.state.loggedin) {
      this.fetchBeers();
      this.fetchBreweries();
    }
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

  handleSubmit = event => {
    event.preventDefault();
    const { accounts } = this.state;
    // console.log("this is the stuff you have on form", event);
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user: {
          username: accounts.username,

          password: accounts.password
        }
      })
    })
      .then(r => r.json())
      .then(r => console.log("successfully created an account", r));
  };

  handleClick = event => {
    // console.log("login", this.state.login);
    // console.log("thiis hits", event);
    // event.preventDefault();
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
        window.localStorage.setItem("username", json.username);
        console.log("fetching after loggin in", json);
        this.setState({
          current_user: json.username,
          login: {
            username: "",
            password: ""
          },
          loggedin: true
        });
      });
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
    console.log("beer Clicked", beerID);
    fetch(`http://localhost:3000/beers/${beerID}`)
      .then(resp => resp.json())
      .then(beer => {
        this.setState({
          beerClicked: beer
        });
      });
  };

  handleClickedBrewery = breweryID => {
    console.log("brewery Clicked", breweryID);
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
      beerReview: event.target.value
    });
    this.fetchPostReviews();
  };

  fetchPostReviews = () => {
    fetch(`http://localhost:3000/reviews`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        beerReview: ""
      })
    });
  };

  render() {
    const { beerData, accounts, current_user } = this.state;
    return (
      <div className="App">
        <NavBar />
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
                      handleClickLogout={this.handleClickLogout}
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
                    />
                  )}
                />
                <Route path="/profile" render={() => <UserProfile />} />
                <Route
                  path="/searchBeers"
                  render={() => (
                    <BeerSearchResults
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
                      beerReview={this.state.beerReview}
                      handleReviewBeer={this.handleReviewBeer}
                      beerClicked={this.state.beerClicked}
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

export default App;

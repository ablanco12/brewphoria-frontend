import React from "react";
// import logo from './logo.svg';
import Home from "./components/Home";
import SignUpPage from "./components/SignUpPage";
import NavBar from "./components/NavBar";
import UserProfile from "./components/UserProfile";
import SearchResults from "./components/SearchResults";
// import Image from 'react-bootstrap/Image'
import { Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends React.Component {
  state = {
    beerData: [],
    beerClicked: 0,
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
    }
  }

  fetchBeers = () => {
    fetch("http://localhost:3000/beers")
      .then(resp => resp.json())
      .then(data => {
        const filteredBeers = data.filter(beer =>
          beer.name.includes(this.state.searchInput)
        );
        this.setState({
          beerData: filteredBeers,
          loggedin: true
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

  render() {
    const { beerData, accounts, current_user } = this.state;
    return (
      <div className="App">
        <NavBar searchNow={this.searchNow} />
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
                path="/search"
                render={() => (
                  <SearchResults
                    beerData={this.state.beerData}
                    handleClickedBeer={this.handleClickedBeer}
                  />
                )}
              />
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import BeerDetails from "./BeerDetails";

class SearchResults extends Component {
  state = {};

  render() {
    const allBeers = this.props.beerData;
    
    return (
      <div className="jumbotron">
        <h2>Search Results:</h2>
        <table className="ui celled striped padded table">
          <tbody>
            <tr>
              <th>
                <h3 className="ui center aligned header">Brand</h3>
              </th>
              <th>
                <h3 className="ui center aligned header">Style</h3>
              </th>
              <th>
                <h3 className="ui center aligned header">ABV</h3>
              </th>
              <th>
                <h3 className="ui center aligned header">IBU</h3>
              </th>
            </tr>

            {allBeers.map(beer => (
              <tr
                key={beer.id}
                beer={beer}
                onClick={() => this.props.handleClickedBeer(beer.id)}
              >
                <td>{beer.name}</td>
                <td>{beer.style}</td>
                <td>{beer.abv}</td>
                <td>{beer.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <BeerDetails />
        </div>
      </div>
    );
  }
}

export default SearchResults;

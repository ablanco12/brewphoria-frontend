import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class BeerSearchResults extends Component {
  state = {};

  render() {
    const allBeers = this.props.beerData;

    console.log(this.props.beerClicked);

    return (
      <Container>
        <Row className="justify-content-lg-center">
          <Col lg={7}>
            <div className="jumbotron">
              <h2 className="beerTitle">Beers</h2>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Find Beer"
                  onChange={event => this.props.searchNow(event.target.value)}
                  className="beer-search mr-md-4"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
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
                      <td>
                        <Link to={`/beer/${beer.id}`}>{beer.name}</Link>
                      </td>

                      <td>{beer.style}</td>
                      <td>{beer.abv}</td>
                      <td>{beer.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default BeerSearchResults;

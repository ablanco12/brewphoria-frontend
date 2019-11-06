import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Form, FormControl, Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class BrewerySearchResults extends Component {
  state = {};
  render() {
    const allBreweries = this.props.breweryData;
    return (
      <Container>
        <Row>
          <Col>
            <div className="jumbotron">
              <h2 className="breweryTitle">Breweries</h2>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Find Brewery"
                  onChange={event => this.props.searchNow(event.target.value)}
                  className="brewery-search mr-md-4"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              <table className="ui celled striped padded table">
                <tbody>
                  <tr>
                    <th>
                      <h3 className="ui center aligned header">Name</h3>
                    </th>
                    <th>
                      <h3 className="ui center aligned header">Location</h3>
                    </th>
                  </tr>

                  {allBreweries.map(brewery => (
                    <tr
                      key={brewery.id}
                      brewery={brewery}
                      onClick={() =>
                        this.props.handleClickedBrewery(brewery.id)
                      }
                    >
                      <td>
                        <Link to={`/brewery/${brewery.id}`}>
                          {brewery.name}
                        </Link>
                      </td>

                      <td>{brewery.location}</td>
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

export default BrewerySearchResults;

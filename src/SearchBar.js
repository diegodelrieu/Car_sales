import React from 'react';
import { Button, Form } from 'react-bootstrap';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      avg: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({ brand: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/mileage?brand=${encodeURIComponent(this.state.brand)}`)
      .then(response => response.json())
      .then(response => this.setState({avg: response[0].avg}));
  }

  render() {
    let averageMileage = ''
    if (this.state.avg && this.state.brand) {
      averageMileage = `${this.state.brand} cars have an average of ${this.state.avg} km/year`
    }
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Label htmlFor="brand">Get mileage per brand: </Form.Label>
        <Form.Control
          id="brand"
          type="text"
          value={this.state.brand}
          onChange={this.handleChange}
          placeholder='Eg: Tesla'
        />
        <Button className="my-2" type="submit">Submit</Button>
        <p>{averageMileage}</p>
      </Form>
    )
  }
}

export default SearchBar;
import React, { Component } from 'react';
import DataTable from './DataTable';
import Chart from './PieChart';
import SearchBar from './SearchBar';
import { Container, Row, Col } from 'react-bootstrap';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: '',
      avg: '',
      cars: [],
      date: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  getDateFromTable = (dataFromChild) => {
    this.setState({ date: dataFromChild })
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
    let pieTitle 
    if (this.state.date) {
      pieTitle = `All cars sold by brand on ${this.state.date}`
    } else {
      pieTitle = `All cars sold by brand`
    }
    return (
      <div className="App">
        <Container>
          <Row className="d-flex align-items-center">
            <Col>
              <h4>{pieTitle}</h4>
              <Chart date={this.state.date} />
            </Col>
            <Col>
              <SearchBar />
            </Col>
          </Row>
            <DataTable callBackFromParent={this.getDateFromTable} />
        </Container>
      </div>
    );
  }
}

export default App;

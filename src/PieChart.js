import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip
} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      datedData: [],
      receivedProps: false
    };
  }

  componentDidMount() {
    this.carSales();
  }

  carSales() {
    if (this.props.date) {
      console.log(this.props.date)
    }
    fetch('/api/cars/sales')
      .then(response => response.json())
      .then(response => this.setState({ data: response }))
  }

  componentWillReceiveProps() {
    if (this.props.date) {
      fetch(`/api/cars/sales?date=\'${this.props.date}\'`)
        .then(response => response.json())
        .then(response => this.setState({ data: response}))
    }
  }

  render() {
    if (!this.state.data) {
      return null
    }

    return (
      <PieChart width={550} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={this.state.data}
          cx={200}
          cy={200}
          innerRadius={90}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label
          >
          {
            this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}

export default Chart;

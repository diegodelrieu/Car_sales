import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      date: ''
    };
  }

  onFiltersChange = (value) => {
    if (value.length === 10) {
      this.setState({ date: value })
      this.props.callBackFromParent(value)
    }
  }

  componentDidMount() {
    this.carList();
  }

  carList() {
    fetch('/api/cars')
      .then(response => response.json())
      .then(response => this.setState({ data: response }))
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Info",
              columns: [
                {
                  Header: "First Name",
                  accessor: "first_name",
                },
                {
                  Header: "Last Name",
                  accessor: "last_name",
                },
                {
                  Header: "Age",
                  accessor: "age"
                }
              ]
            },
            {
              Header: 'Stats',
              columns: [
                {
                  Header: "Purchase date",
                  accessor: "purchase_date",
                  filterable: true,
                  getHeaderProps: (state, rowInfo, column, instance) => {
                    return {
                      onKeyUp: e =>
                        this.onFiltersChange(state.filtered[0] !== undefined ? state.filtered[0].value : '')
                    };
                  }
                },
                {
                  Header: "Car brand",
                  accessor: "car_brand"
                },
                {
                  Header: "Mileage (km/year)",
                  accessor: "km_year"
                }
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          onChange={event => this.onFiltersChange(event.target.value)}
        />
        <br />
      </div>
    );
  }
}

export default DataTable;

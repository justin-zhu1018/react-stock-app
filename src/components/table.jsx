import React, { Component } from "react";
import "../components/dm.css";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headings: [
        "Open Price",
        "High Price",
        "Low Price",
        "Current Price",
        "Previous Close Price",
        "Time",
      ],
    };
  }

  render() {
    const headings = this.state.headings;
    const headingMarkup = (
      <tr>
        {headings.map((heading) => (
          <th scope="col">{heading}</th>
        ))}
      </tr>
    );

    const stockData = this.props.dataArray;
    const renderRowData = (stock) => {
      return (
        <tr>
          <td>{stock[0].o}</td>
          <td>{stock[0].h}</td>
          <td>{stock[0].l}</td>
          <td>{stock[0].c}</td>
          <td>{stock[0].pc}</td>
          <td>{stock[1].time}</td>
        </tr>
      );
    };
    return (
      <div className="dark-mode">
        <table className="table table-dark">
          <thead>{headingMarkup}</thead>
          <tbody>{stockData.map(renderRowData)}</tbody>
        </table>
      </div>
    );
  }
}

export default Table;

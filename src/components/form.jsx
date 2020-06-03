import React, { Component } from "react";
import "../components/form.css";
class Search extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <input
            className="small"
            placeholder="MIN"
            value={this.props.minutes}
            onChange={(e) => this.props.updateMinutes(e.target.value)}
          ></input>
          <input
            className="small"
            placeholder="SEC"
            value={this.props.seconds}
            onChange={(e) => this.props.updateSeconds(e.target.value)}
          ></input>
          <input
            className="small"
            placeholder="SYMBOL"
            value={this.props.symbol}
            onChange={(e) => this.props.updateSymbol(e.target.value)}
          ></input>
          <button
            onClick={this.props.handleData}
            className="btn btn-sm btn-danger m-3"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Search;

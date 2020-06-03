import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Search from "./components/form.jsx";
import Table from "./components/table.jsx";
import "./components/dm.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: "",
      seconds: "",
      symbol: "",
      data: [],
      dataArray: [],
      link: "",
      inputInterval: "",
      submittedSymbol: "",
      submittedMinutes: "",
      submittedSeconds: "",
      currentTime: "",
    };
  }

  renderStockInformation = () => {
    // console.log("seconds: ", this.state.seconds);
    // console.log("minutes: ", this.state.minutes);
    const toMilliseconds =
      (60 * this.state.submittedMinutes + this.state.submittedSeconds) * 1000;
    this.instructions(toMilliseconds);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = this.state;
    console.log("handleSubmit");
    this.setState({
      submittedSymbol: this.state.symbol,
      submittedMinutes: this.state.minutes,
      submittedSeconds: this.state.seconds,
    });
    this.setState(
      { symbol: "", minutes: "", seconds: "" },
      this.renderStockInformation
    );
  };

  updateMinutes = (e) => {
    this.setState({ minutes: e });
  };

  updateSeconds = (e) => {
    this.setState({ seconds: e });
  };

  updateSymbol = (e) => {
    this.setState({ symbol: e });
  };

  linkModify = (symbol) => {
    return (
      "https://finnhub.io/api/v1/quote?symbol=" +
      symbol +
      "&token=br906t7rh5ral083k820"
    );
  };

  grabData = () => {
    this.updateCurrentTime();

    fetch(
      // "https://finnhub.io/api/v1/quote?symbol=MSFT&token=br906t7rh5ral083k820"
      this.linkModify(this.state.submittedSymbol)
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        // console.log("time: ", this.state.currentTime);
        console.log("response: ", response);

        let timeValue = { time: this.state.currentTime };
        this.setState({ data: [response, timeValue] }, this.addRow);
      });
  };

  addRow = () => {
    const test = this.state.data;

    const testvar = this.state.currentTime;
    let newDate = { value: testvar };
    this.setState({ data: [test, newDate] });
    const m = this.state.data;

    const input = {};
    if (this.state.dataArray.length !== 0) {
      this.setState({ dataArray: [...this.state.dataArray, m] });
    } else {
      this.setState({ dataArray: [test] });
    }
  };

  updateCurrentTime = () => {
    var tempDate = new Date();
    const date =
      tempDate.getMonth() +
      "/" +
      tempDate.getDate() +
      "/" +
      tempDate.getFullYear() +
      " " +
      tempDate.getHours() +
      ":" +
      tempDate.getMinutes() +
      ":" +
      tempDate.getSeconds();

    this.setState({ currentTime: date });
  };

  instructions = (interval) => {
    // console.log("instructions symbol: ", this.state.symbol);
    if (this.state.dataArray.length === 0) {
      var handle = setInterval(this.grabData, interval);
      this.grabData();
      // this.setState({ intervalHandle: handle });
    } else {
      clearInterval(handle);
      this.setState({ dataArray: [] });
      this.grabData();
      // handle = setInterval(this.grabData, 5000);
    }
  };

  clearData = () => {
    // this.setState({ dataArray: [] });
    clearInterval(this.state.intervalHandle);
  };

  componentDidUpdate() {
    // console.log("Update Symbol: " + this.state.symbol);
    // console.log("update link:", this.linkModify(this.state.symbol));
    // console.log("Update: ", this.state.data);
    // this.addRow()
    // console.log("upda");
  }

  render() {
    return (
      <div className="dark-mode">
        <div>
          <Search
            updateMinutes={this.updateMinutes}
            minutes={this.state.minutes}
            updateSeconds={this.updateSeconds}
            seconds={this.state.seconds}
            updateSymbol={this.updateSymbol}
            symbol={this.state.symbol}
            handleSubmit={this.handleSubmit}
          />
        </div>
        <div>
          <Table dataArray={this.state.dataArray}></Table>
        </div>
      </div>
    );
  }
}

export default App;

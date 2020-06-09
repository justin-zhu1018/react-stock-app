import React, { Component } from "react";
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
      currentDateAndTime: "",
    };
    var handle;
  }

  handleSubmit = (event) => {
    // console.log("handle submit");
    event.preventDefault();
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

  renderStockInformation = () => {
    const toMilliseconds =
      (60 * this.state.submittedMinutes + this.state.submittedSeconds) * 1000;
    this.instructions(toMilliseconds);
  };

  instructions = (interval) => {
    clearInterval(this.handle);
    this.handle = setInterval(this.grabData, interval);
    if (this.state.dataArray.length !== 0) {
      this.setState({ dataArray: [] });
    }
    this.grabData();
  };

  grabData = () => {
    this.updateDateAndTime();
    fetch(
      // "https://finnhub.io/api/v1/quote?symbol=MSFT&token=br906t7rh5ral083k820"
      this.modifyLink(this.state.submittedSymbol.toUpperCase())
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let timeValue = { time: this.state.currentDateAndTime };
        this.setState({ data: [response, timeValue] }, this.addRow);
      });
  };

  updateDateAndTime = () => {
    var tempDateAndTime = new Date();

    const dateAndTime =
      this.formatMonth(tempDateAndTime.getMonth()) +
      "/" +
      this.formatNumber(tempDateAndTime.getDate().toString()) +
      "/" +
      tempDateAndTime.getFullYear() +
      " " +
      this.formatNumber(tempDateAndTime.getHours().toString()) +
      ":" +
      this.formatMinuteAndSeconds(tempDateAndTime.getMinutes().toString()) +
      ":" +
      this.formatMinuteAndSeconds(tempDateAndTime.getSeconds().toString());

    this.setState({ currentDateAndTime: dateAndTime });
  };

  formatMonth = (number) => {
    if (number - 10 < 0) {
      return "0" + (number + 1);
    } else {
      if (number > 12) {
        if (number - 12 >= 10) {
          return number - 12;
        }
        return "0" + number - 12;
      }
      return number;
    }
  };

  formatNumber = (number) => {
    if (number == 0) {
      return 12;
    } else {
      if (number - 10 < 0) {
        return "0" + number;
      } else {
        if (number > 12) {
          if (number - 12 >= 10) {
            return number - 12;
          }
          return "0" + number - 12;
        }
        return number;
      }
    }
  };

  formatMinuteAndSeconds = (number) => {
    if (number - 10 < 0) {
      return "0" + number;
    } else {
      return number;
    }
  };

  modifyLink = (symbol) => {
    return (
      "https://finnhub.io/api/v1/quote?symbol=" +
      symbol +
      "&token=br906t7rh5ral083k820"
    );
  };

  addRow = () => {
    const data = this.state.data;

    const dateAndTime = this.state.currentDateAndTime;
    let newDate = { value: dateAndTime };
    this.setState({ data: [data, newDate] });

    if (this.state.dataArray.length !== 0) {
      this.setState({ dataArray: [...this.state.dataArray, data] });
    } else {
      this.setState({ dataArray: [data] });
    }
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

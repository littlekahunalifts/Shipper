import { useState } from "react";
import "./App.css";
import axios from "axios";
import React from "react";
import ShipperMenu from "./ShipperMenu";

// where I found this stuff
// https://www.youtube.com/watch?v=fBA-jaWab9k
// run command: npm run dev

const url = "http://localhost:8000/shipper/api/";

class App extends React.Component {
  state = { details: [] };
  componentDidMount(): void {
    let data;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(url)
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }
  render() {
    return (
      <div>
        <ShipperMenu></ShipperMenu>
        <header>Current Ships:</header>
        <hr></hr>
        {this.state.details.map((vessel) => (
          <div id="{vessel.naccs}">
            <h3>{vessel.naccs}</h3>
            <ul>
              <li>Name: {vessel.name}</li>
              <li>Owner {vessel.owner_id}</li>
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

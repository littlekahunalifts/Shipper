import { useState } from "react";
import "./App.css";
import axios from "axios";
import React from "react";

// where I found this stuff
// https://www.youtube.com/watch?v=fBA-jaWab9k

class App extends React.Component {
  state = { details: [] };
  componentDidMount(): void {
    let data;
    axios
      .get("http://localhost:8000/shipper/api")
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
        <header> Data generated from Django </header>
        <hr></hr>
        {this.state.details.map((output, id) => (
          <div>
            <h1>Did it?</h1>
          </div>
        ))}
      </div>
    );
  }
}

export default App;

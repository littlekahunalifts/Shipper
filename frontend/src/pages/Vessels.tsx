import axios from "axios";
import React from "react";

interface Vessel {
  naccs: string;
  name: string;
  owner_id: string;
}

class Vessels extends React.Component {
  url = "http://localhost:8000/shipper/api/";
  state = { details: [] };
  componentDidMount(): void {
    let data;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(this.url)
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
      <>
        <div className="container">
          <h1>Currently Registered Ships:</h1>
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Vessel NACCS</th>
                <th>Vessel Name</th>
                <th>Owner of Vessel</th>
              </tr>
            </thead>
            <tbody>
              {this.state.details.map((vessel: Vessel) => (
                <tr id="{vessel.naccs}">
                  <td>{vessel.naccs}</td>
                  <td>{vessel.name}</td>
                  <td>{vessel.owner_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

export default Vessels;

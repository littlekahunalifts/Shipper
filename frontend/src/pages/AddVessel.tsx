import axios from "axios";
import React from "react";
import Vessels from "./Vessels";

class AddVessel extends React.Component {
  url = "http://localhost:8000/shipper/api/";
  state = { naccs: "", name: "", owner_id: "" };

  handleInput(event: React.ChangeEvent<HTMLInputElement>): void {
    const val = event.target.value;
    this.setState({
      [event.target.name]: val,
    });
  }

  post = () => {
    let data = this.state;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .post(this.url, data)
      .then((res) => {
        data = res.data;
        window.location.href = "/view-vessels";
      })
      .catch((err) => {});
  };
  render = () => {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8">
              <h1>Register a New Vessel:</h1>
              <form className="row g-3" onSubmit={this.post}>
                <div className="mb-3">
                  <label htmlFor="formGroupExampleInput" className="form-label">
                    NACCS Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="E.g., ABC123, JPY100"
                    name="naccs"
                    onChange={(event) => this.handleInput(event)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label"
                  >
                    Vessel Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="E.g., Seafarer II, High Seas' GM"
                    name="name"
                    onChange={(event) => this.handleInput(event)}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="formGroupExampleInput2"
                    className="form-label"
                  >
                    Owner Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput2"
                    placeholder="E.g., John Smith, Bosun Bill"
                    name="owner_id"
                    onChange={(event) => this.handleInput(event)}
                  />
                </div>
                <div className="d-flex flex-row-reverse">
                  <button type="submit" className="btn btn-primary float-right">
                    Add Vessel
                  </button>
                </div>
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </>
    );
  };
}

export default AddVessel;

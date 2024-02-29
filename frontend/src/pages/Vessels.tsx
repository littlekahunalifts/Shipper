import axios from "axios";
import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Vessel {
  naccs: string;
  name: string;
  owner_id: string;
}

function Vessels() {
  const url = "http://localhost:8000/shipper/api/";
  const [state, setState] = useState({ details: [] });
  const navigate = useNavigate();
  const handleClick = (data: Vessel) => {
    let edit_url = "/edit-vessel/" + data.naccs + "/";
    navigate(edit_url, { state: data });
  };

  useEffect(() => {
    let data;
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .get(url)
      .then((res) => {
        data = res.data;
        setState({
          details: data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {state.details.map((vessel: Vessel) => (
              <tr id="{vessel.naccs}" key={vessel.naccs}>
                <td>{vessel.naccs}</td>
                <td>{vessel.name}</td>
                <td>{vessel.owner_id}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleClick(vessel)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Vessels;

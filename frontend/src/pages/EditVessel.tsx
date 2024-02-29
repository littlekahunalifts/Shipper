import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditVessel() {
  const { naccs } = useParams();
  const url = "http://localhost:8000/shipper/api/" + naccs + "/";
  const navigate = useNavigate();
  let location = useLocation();
  let { name, owner_id } = location.state;
  let [state, setState] = useState({
    naccs: naccs,
    name: name,
    owner_id: owner_id,
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const patch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    // axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    axios
      .patch(url, state)
      .then((res) => {
        navigate("/view-vessels");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-8">
            <h1>Edit Vessel {naccs}:</h1>
            <form className="row g-3" onSubmit={patch}>
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
                  readOnly
                  disabled
                  value={naccs}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Vessel Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="E.g., Seafarer II, High Seas' GM"
                  name="name"
                  onChange={(event) => handleInput(event)}
                  value={state.name}
                  contentEditable
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Owner Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="E.g., John Smith, Bosun Bill"
                  name="owner_id"
                  onChange={(event) => handleInput(event)}
                  value={state.owner_id}
                />
              </div>
              <div className="d-flex flex-row-reverse">
                <button type="submit" className="btn btn-primary float-right">
                  Update {naccs}
                </button>
              </div>
            </form>
          </div>
          <div className="col-2"></div>
        </div>
      </div>
    </>
  );
}

export default EditVessel;

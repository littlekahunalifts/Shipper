import axios from "axios";
import React from "react";

// class Vessels extends React.Component {
//   state = { details: [] };
//   componentDidMount(): void {
//     let data;
//     axios.defaults.headers.post["Content-Type"] =
//       "application/json;charset=utf-8";
//     axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
//     axios
//       .get(url)
//       .then((res) => {
//         data = res.data;
//         this.setState({
//           details: data,
//         });
//       })
//       .catch((err) => {});
//   }
//   render() {
//     return (
//       <div>
//         <h1>Current Ships:</h1>
//         <hr></hr>
//         {this.state.details.map((vessel) => (
//           <div id="{vessel.naccs}">
//             <h3>{vessel.naccs}</h3>
//             <ul>
//               <li>Name: {vessel.name}</li>
//               <li>Owner {vessel.owner_id}</li>
//             </ul>
//           </div>
//         ))}
//       </div>
//     );
//   }
// }

function Vessels() {
  return <h1>Vessels Page</h1>;
}

export default Vessels;

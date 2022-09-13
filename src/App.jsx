import React from "react";
import { Outlet, Link } from "react-router-dom";

import Header from "./components/Header"

function App() {
  return (
    <div className="App">
      < nav style = {
            {
                borderBottom: "solid 1px",
                paddingBottom: "1rem",
                marginBottom: "0px"
            }
        }>
        <Link to = "/main" style = {{ marginLeft: "20px" } } > MainWindow </Link> |{" "}
        </nav> 
        <Header/>
        <Outlet/>
    </div>
  );
}

export default App;
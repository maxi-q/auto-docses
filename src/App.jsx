import React from "react";
import { Outlet, Link } from "react-router-dom";

import Header from "./components/Header"
import Footer from "./components/Footer";

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
        <Link to = "/Home" style = {{ marginLeft: "20px" } } > MainWindow </Link> |{" "}
        </nav> 
        <Header/>
        <Outlet className="main-content"/>
        <Footer/>
    </div>
  );
}

export default App;
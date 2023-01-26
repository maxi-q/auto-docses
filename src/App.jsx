import React from "react";
import { Outlet, Link } from "react-router-dom";

import { Header } from "./modules"
import { Footer } from "./modules"
// import {Footer} from "./components/Footer";

import styled from 'styled-components';

export function App() {
  return (
    <>
      < DeveloperNav>
        <Link to="/Home" style={{ marginLeft: "20px" } }> MainWindow </Link> |{" "}
        <Link to="/LoadPage"> LoadPage </Link> |{" "}
      </DeveloperNav> 

      <Header/>
        <MainStyled>
          <Outlet/>
        </MainStyled>
      <Footer/>
    </>
  );
}

const DeveloperNav = styled('nav')`
  border-bottom: solid 1px;
  padding-bottom: .5rem;
  margin-bottom: 0px;
`
const MainStyled = styled.div`
  background-color: rgb(179, 208, 208);
  min-height: 1000px;
  flex: 1 0 auto;
`
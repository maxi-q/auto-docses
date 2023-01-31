import React from "react";
import {Link, BrowserRouter } from "react-router-dom";

import { Navigation } from "./pages";
import { Header } from "./modules"
import { Footer } from "./modules"

import styled from 'styled-components';

export function App() {
	return (
		<BrowserRouter>
			< DeveloperNav>
				<Link to="/Home" style={{ marginLeft: "20px" } }> MainWindow </Link> |{" "}
				<Link to="/LoadPage"> LoadPage </Link> |{" "}
			</DeveloperNav> 
			<Header/>
			<MainStyled>
				<Navigation />
			</MainStyled>
			<Footer/>
		</BrowserRouter>
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
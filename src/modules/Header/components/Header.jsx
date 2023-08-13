import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { AiOutlineSmile } from 'react-icons/ai'
import { fetchVerifyJWT } from '../../../API/user/token/verifyJWT'

export const Header = () => {
	//тут должна быть проверка токена

	fetchVerifyJWT().then(data => {
		if (data.status == 401) {
			localStorage.setItem('access', '')
		}
	})

	return (
		<Navbar as="header" bg="light" expand="lg" className="navbar navbar-light" style={{position: "absolute", width: '100vw'}}>
      <Container>
        <Navbar.Brand as={Link} to="/Home">AutoDocxOnline</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Records">Записи</Nav.Link>
            <Nav.Link as={Link} to="/LoadPage">Заполнение</Nav.Link>
            <Nav.Link as={Link} to="/document">Документы</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/Profile">
              <AiOutlineSmile style={{fontSize: '30px'}}/>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>  
      </Container>
    </Navbar>
	)
}

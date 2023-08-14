import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'


interface IHeader {
	logOut: Function
}

export const Header = ({ logOut }: IHeader) => {
	return (
		<Navbar
			as='header'
			bg='light'
			expand='lg'
			className='navbar navbar-light'
			style={{ position: 'absolute', width: '100%' }}
		>
			<Container>
				<Navbar.Brand as={Link} to='/Home'>
					AutoDocxOnline
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='me-auto'>
						<Nav.Link as={Link} to='/Records'>
							Записи
						</Nav.Link>
						{/* <Nav.Link as={Link} to="/LoadPage">Заполнение</Nav.Link> */}
						{/* <Nav.Link as={Link} to="/document">Документы</Nav.Link> */}
					</Nav>
					<Nav>
						<Nav.Link as={Link} to='/Profile'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-emoji-smile'
								viewBox='0 0 16 16'
								style={{ fontSize: '30px' }}
							>
								<path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
								<path d='M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z' />
							</svg>
						</Nav.Link>
						<Nav.Link onClick={() => logOut()} as={Link} to='/Auth'>
							<svg
              style={{ fontSize: '20px', marginLeft: '10px' }}
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								fill='currentColor'
								className='bi bi-box-arrow-left'
								viewBox='0 0 16 16'
							>
								<path
									fill-rule='evenodd'
									d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
								/>
								<path
									fill-rule='evenodd'
									d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
								/>
							</svg>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';


function Header() {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/">ProShop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <Nav.Link as={Link} to="/cart"><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                    <NavDropdown.Item><Link to="/profile">Profile</Link></NavDropdown.Item>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>


                            ) : <Nav.Link as={Link} to="/login"><i className='fas fa-user'></i> Sign In</Nav.Link>}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id="adminmenu">
                                <NavDropdown.Item><Link to="/admin/userlist">Users</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/admin/productlist">Products</Link></NavDropdown.Item>
                                <NavDropdown.Item><Link to="/admin/orderlist">Orders</Link></NavDropdown.Item>
                            </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header

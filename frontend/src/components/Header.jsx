import React from 'react';
import { Badge, Navbar, Nav, Container, NavDropdown} from 'react-bootstrap';
import { FaShoppingCart, FaUser} from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout }  from '../slices/authSlice';
import SearchBox from './SearchBox';
import { resetCart } from '../slices/cartSlice';


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            dispatch(resetCart());
            navigate('/login')
        } catch (err) {
            console.log(err);
        }
    };
    
    return (
    <header>
        <Navbar bg='dark' variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} to="/"><img src={logo} alt="Librarie" /> Librarie</Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav'/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <SearchBox />
                        <Nav.Link as={Link} to="/cart"><FaShoppingCart/> 
                        Cos
                        {
                            cartItems.length > 0 && (
                                <Badge pill bg='success' style={{marginLeft:'5px'}}>
                                    { cartItems.reduce((a, c) => a + c.qty, 0)}
                                </Badge>
                            )
                        }
                        </Nav.Link>
                        { userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                            <NavDropdown.Item as={Link} to="/profile">
                                Profile
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={logoutHandler}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        
                        ) : (<Nav.Link as={Link} to="/login"><FaUser /> Conecteaza-te</Nav.Link>)}
                        { userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <NavDropdown.Item as={Link} to='/admin/productlist' >Produse</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/admin/userlist' >Utilizatori</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/admin/orderlist' >Comenzi</NavDropdown.Item>
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
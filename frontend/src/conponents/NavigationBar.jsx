import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuthContext } from "../hooks/useAuthContext";
import { RiHome2Line, RiUserLine } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import useLogout from "../hooks/useLogout";
import "./NavigationBar.css";
import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className='navbar-header'>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container fluid>
          <Navbar.Brand>
            <LinkContainer to='/'>
              <Nav.Link>
                <RiHome2Line className='home-icon' />
                Paradise Cove
              </Nav.Link>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {user ? (
                <>
                  {user.userType === "admin" ? (
                    <>
                      <LinkContainer to='/dashboard'>
                        <Nav.Link>
                          <RiUserLine className='user-icon' />
                          {user.name}
                        </Nav.Link>
                      </LinkContainer>
                    </>
                  ) : (
                    <LinkContainer to='/dashboard'>
                      <Nav.Link>
                        <RiUserLine className='user-icon' />
                        {user.name}
                      </Nav.Link>
                    </LinkContainer>
                  )}
                  <Nav.Link onClick={logoutHandler}>
                    <FaSignOutAlt className='logout-icon' />
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to='/login'>
                    <Nav.Link>Sign In</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/register'>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavigationBar;

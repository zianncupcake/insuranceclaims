
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from "react-router-dom";
import axios from "axios";
import {useAuth} from '../context/UserContext'



const HeaderComponent = () => {
 const handleLogout = () => {
    logout();
  };  
  const { user, logout } = useAuth();


  console.log("user", user);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
            <Nav>
            {user? (
              <>        
              <NavDropdown title={`${user.FirstName} ${user.LastName}`} >
              <NavDropdown.Item eventKey="/login" as={Link} to="/login" onClick={() => handleLogout()}>Logout</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to="/dashboard">
                  <Nav.Link>My Claims</Nav.Link>
                </LinkContainer>

              <LinkContainer to="/insurances">
                  <Nav.Link>My Insurances</Nav.Link>
                </LinkContainer>

              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>

              </>
            )}

          </Nav>

      </Container>
    </Navbar>
  );
}

export default HeaderComponent;
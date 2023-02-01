import {React,useReducer} from "react";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MDBIcon } from 'mdbreact';
import logo from "../images/logo_transparent.png"

const NavigationBar = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)


  //FUNCTION THAT HANDLES THE LOGOUT PROCESS
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/",{replace: true});
      forceUpdate();
    } catch (error) {
      console.log(error.message);
    }
  };

  //RENDER NAVIGATION BAR COMPONENT
  return (
    <>

      <Navbar bg="primary" variant="dark" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              height="40px"
              width="40px"
            />{' '}
            Recipeeez
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <MDBIcon icon='user-alt' />
              <Navbar.Text className="">
                <a>{user.email}</a>
              </Navbar.Text>

              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;

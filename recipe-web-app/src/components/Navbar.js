import {React,useEffect,useReducer, useState} from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/AuthContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { MDBIcon } from 'mdbreact';
import logo from "../images/logo_transparent.png"
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)



 
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/",{replace: true});
      forceUpdate();
    } catch (error) {
      console.log(error.message);
    }
  };

  // const authButton = () =>
  // {

  //   console.log("user details: ",user)
  //   if( signInFlag=== null || signInFlag === "")
  //   {
  //     return (
  //       <Button variant="outline-light" size="sm" as={Link} to="/signin">
  //       Log in
  //     </Button>
  //     )
  //   }
  //   else{
  //     <Button variant="outline-light" size="sm" onClick={handleLogout}>
  //               Log out
  //             </Button>
  //   }
  // }
  
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
              {/* <Form>
                {authButton()}
              </Form> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;

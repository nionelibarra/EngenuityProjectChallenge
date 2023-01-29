import { React, useState } from 'react'
import {
  MDBContainer,
  MDBBtn,
  MDBIcon,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit';
import { auth } from "../firebase";
import { Link, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';
import { Alert } from 'react-bootstrap';
import logo from "../images/logo_coloredbg.png"
import "./SignUp.css";


export function SignUp() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp } = useUserAuth();
  const [error, setError] = useState()
  const navigate = useNavigate();


  //function that handles the signup process upon clicking the "Sign Up" button
  const signUpHandler = async (e) => {
    e.preventDefault();
    setError("")
    try {
      //DELETE THESE CONSOLE LOGS ONLY FOR TESTING
      console.log("email: " + email)
      console.log("pass: " + password)
      await signUp(email, password);
      navigate("/")

    }
    catch (err) {
      setError(err.message);
    }

  }

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <img src={logo} width="90rem" height="90rem" class="center" />
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <form id='signUpForm' onSubmit={signUpHandler}>
            <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' />
            <MDBInput wrapperClass='mb-4' label='Confirm password' size='lg' id='form4' type='password' onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </form>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' form='signUpForm'>Register</MDBBtn>
          <hr className="my-4" />
          <div className=" text-center"> Already have an account yet? <Link to="/"> Login</Link></div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>

  );
}



import { React, useEffect, useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import logo from "../images/logo_coloredbg.png"
import "./SignUp.css";
import { useUserAuth } from '../context/AuthContext';


export function SignUp() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signUp, userUid, user } = useUserAuth();
  const [error, setError] = useState()
  const navigate = useNavigate();
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [uid, setUid] = useState('')




  const newUserInfo =
  {
    displayName,
  }

  //SET USER ID INTO A LOCAL FUNCTION VARIABLE  FROM AUTH CONTEXT
  useEffect((e) => {
    setUid(userUid)
    console.log("saved uid in local signup variable: ", uid)

  })


  //FUNCTION THAT HANDLES THE SIGNUP PROCESS 
  const signUpHandler = async (e) => {
    e.preventDefault();
    setError("")
    if (displayName === "" || email === "" || password === "" || confirmPassword === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    else if (password !== confirmPassword) {
      setMessage({ error: true, msg: "Passwords Do Not Match" });
      return;
    }
    else if (!password.length >= 6 || !confirmPassword.length >= 6) {
      setMessage({ error: true, msg: "Passwords have a length of 6 characters above" });
      return;
    }

    signUp(email, password)
     navigate("/")
  }


  //RENDER SING UP PAGE COMPONENTS
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '600px' }}>
        <MDBCardBody className='px-5'>
          <img src={logo} width="90rem" height="90rem" class="center" />
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          {message?.msg && (
            <Alert
              variant={message?.error ? "danger" : "success"}
              dismissible
              onClose={() => setMessage("")}
            >
              {message?.msg}
            </Alert>
          )}
          {error && <Alert variant="danger">{error}</Alert>}
          <form id='signUpForm' onSubmit={signUpHandler}>
            <MDBInput wrapperClass='mb-4' label='Display Name' size='lg' type='text' placeholder="e.g. Mang Juan" onChange={(e) => {
              setDisplayName(e.target.value)
            }} />
            <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' type='email' placeholder="sample@email.com" onChange={(e) => {
              setEmail(e.target.value)
            }} />
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' type='password' placeholder="At least 6 characters" onChange={(e) => {
              setPassword(e.target.value)
            }} />
            <MDBInput wrapperClass='mb-4' label='Confirm password' size='lg' type='password' onChange={(e) => {
              setConfirmPassword(e.target.value)
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



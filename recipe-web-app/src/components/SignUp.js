import {React,useState} from 'react'
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
  import {auth} from "../firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';

export function SignUp() {
  const [email,setEmail]= useState('')
  const [password,setPassword]=useState('')



  //function that handles the signup process upon clicking the "Sign Up" button
  function signUpHandler(e)
  {
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password).then((userCredential) => {
  console.log(userCredential) //DELETE this later. this is onyl for testing
    }).catch((error)=>
    {
      console.log(error)
    })
  }

  return (
      <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image'>
        <div className='mask gradient-custom-3'></div>
        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
          <MDBCardBody className='px-5'>
            <h2 className="text-uppercase text-center mb-5">Create an account</h2>
            <form id='signUpForm' onSubmit={signUpHandler}>
            <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email}/>
            <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
            <MDBInput wrapperClass='mb-4' label='Confirm password' size='lg' id='form4' type='password' value={password}/>
            </form>
            <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' type='submit' form='signUpForm'>Register</MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    
    );
}



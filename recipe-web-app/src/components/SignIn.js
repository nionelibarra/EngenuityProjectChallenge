import React, { useState } from 'react';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
}
  from 'mdb-react-ui-kit';
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';


export function SignIn() {

  //declared variables to store the email and password user inputs on form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //Submit Handler function that runs upon pressing the 'Log In' button\
const signInHandler = (e) =>
{
  e.preventDefault();
  signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
console.log(userCredential) //DELETE this later. this is onyl for testing
  }).catch((error)=>
  {
    console.log(error)
  })
}

  return (

    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '500px' }} >
            <MDBCardBody className='p-5 w-100 d-flex flex-column'>
              <form id="signInForm" onSubmit={signInHandler}>
              <h2 className="text-uppercase text-center mb-5">SIGN IN</h2>
              <p className="text-white-50 mb-3">Please enter your login and password!</p>

              <MDBInput wrapperClass='mb-4 w-100' label='Email address' id='formControlLg' type='email' size="lg" value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <MDBInput wrapperClass='mb-4 w-100' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

              {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}
              </form>
              <MDBBtn size='lg' type="submit" form='signInForm'>
                Login
              </MDBBtn>

              <hr className="my-4" />

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
  
}

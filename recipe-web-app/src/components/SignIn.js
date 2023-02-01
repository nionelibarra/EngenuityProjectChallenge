import React, {useState} from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody
} from 'mdb-react-ui-kit';
import {auth} from "../firebase";
import {useUserAuth} from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import {Alert} from 'react-bootstrap';
import logo from "../images/logo_coloredbg.png"
import './SignIn.css'

// VARIABLES TO STORE EMAIL AND PASSWORD INPUTS BY USER
export function SignIn() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signIn} = useUserAuth();
    const [error, setError] = useState()
    const {user} = useUserAuth();
    const navigate = useNavigate();


    // Function that handles the signin method upon clicking the "Log in" button
    const signInHandler = async (e) => {
        e.preventDefault();
        setError("")
        try {
            await signIn(email, password)

            console.log("Succesfully logged in USER!")
            navigate("/dashboard", {replace: true}) // must navigate to home page and prevent back button to go back to login page

        } catch (error) {
            setError(error)
        }
    }

    return (
        <body>
        <div className="main-body-userlogin">
            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                    <MDBCol col='12'>

                        <MDBCard className='bg-white my-5 mx-auto'
                            style={
                                {
                                    borderRadius: '1rem',
                                    maxWidth: '500px'
                                }
                        }>
                            <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                <form id="signInForm"
                                    onSubmit={signInHandler}>
                                    <img src={logo}
                                        width="90rem"
                                        height="90rem"
                                        class="center"/>
                                    <h2 className="text-uppercase text-center mb-5">SIGN IN</h2>
                                    {
                                    error && <Alert variant="danger">
                                        {error}</Alert>
                                }
                                    <p className="text-white-50 mb-3">Please enter your login and password</p>

                                    <MDBInput wrapperClass='mb-4 w-100' placeholder='juan@sample.com' label='Email address' id='formControlLg' type='email' size="lg"
                                        onChange={
                                            (e) => setEmail(e.target.value)
                                        }/>
                                    <MDBInput wrapperClass='mb-4 w-100' placeholder='Password' label='Password' id='formControlLg' type='password' size="lg"
                                        onChange={
                                            (e) => setPassword(e.target.value)
                                        }/> {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */} </form>
                                <MDBBtn size='lg' type="submit" form='signInForm'>
                                    Login
                                </MDBBtn>

                                <hr className="my-4"/>
                                <div className=" text-center">
                                    Don't have an account yet?
                                    <Link to="/signup">
                                        Sign Up</Link>
                                </div>
                                <hr className="my-4"/>
                                <div className=" text-center">
                                    <Link to="/admin">
                                        Administrator Login</Link>
                                </div>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>
        </div>
        </body>

    );

}

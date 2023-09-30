import { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  }
  from 'mdb-react-ui-kit';


function Login({user}) {

  // state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()

  // update the value of email on email input change
  const onEmailChange = (event)=>{
    setEmail(event.target.value);
  }

  // update  the value of password on password input change
  const onPasswordChange = (event)=>{
    setPassword(event.target.value);
  }

  // onSubmit make a post request to the 'login' server endpoint on submission
  const onSubmit = async (event) => {
    event.preventDefault()
    const data = {
      email: email,
      password: password
    }
    axios.post('http://localhost:4000/login', data)
    .then(res => { console.log('no data')
      if(res.data.status==='success'){
        user(res.data.data);
        navigate('/dashboard');
        setError('');
      }else{
        setError(res.data.error);
      }
  });
  }
    
    return (
        <MDBContainer fluid className='login-container'>
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
             
                  <p className='text-danger'>{error && error}</p>
               
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">Please enter your login credentials!</p>
    
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' onChange={onEmailChange} label='Email address' id='formControlLg' type='email' size="lg"/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg1' onChange={onPasswordChange} type='password' size="lg"/>
    
                  <MDBBtn outline className='mx-2 px-5' color='white' size='lg' onClick={onSubmit}>
                    Login
                  </MDBBtn>
                  
                  <div>
                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
}

export default Login;
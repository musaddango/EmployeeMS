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


function Login() {
  // state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [employeeError, setEmployeeError] = useState('');
  const [adminLogin, setAdminLogin] = useState(false);
  const [empLogin, setEmpLogin] = useState(false);
  const [loginPath, setLoginPath] = useState(true);
  const navigate = useNavigate();

  // Cookies permission
  axios.defaults.withCredentials = true;


  // Login interface logic
  const handleAdminLogin = function(event){
    event.preventDefault();
    setLoginPath(false);
    setAdminLogin(true);
    setEmpLogin(false);
  }

  const handleEmpLogin = function(event){
    event.preventDefault();
    setLoginPath(false);
    setAdminLogin(false);
    setEmpLogin(true);
  }

  // update the value of email on email input change
  const onEmailChange = (event)=>{
    setEmail(event.target.value);
  }

  // update  the value of password on password input change
  const onPasswordChange = (event)=>{
    setPassword(event.target.value);
  }

  // onSubmit make a post request to the 'login' server endpoint on submission
  const onSubmitAdminLogin = async (event) => {
    event.preventDefault()
    const data = {
      email: email,
      password: password
    }
    axios.post('http://localhost:4000/admin_login', data)
    .then(res => {
        console.log(res);
        if(res.data.status==='login success'){
          navigate('/dashboard/home');
          setAdminError('');
      }else{
        setAdminError('Wrong login email or password. Ensure the correct detail is entered.');
      }
  })
  .catch(err=> {
    throw new Error('Fail to login')
  })
  }

  const onSubmitEmployeeLogin = async (event) => {
    event.preventDefault()
    const data = {
      email: email,
      password: password
    }
    axios.post('http://localhost:4000/employee_login', data)
    .then(res => {
        console.log(res);
        if(res.data.status==='login success'){
          navigate('/employee_details');
          setEmployeeError('');
      }else{
        setEmployeeError('Wrong login email or password. Ensure the correct detail is entered.');
      }
  })
  .catch(err=> {
    throw new Error('Fail to login')
  })
  }
    
    return (
            <>
              {/* Main Admin/Employee Login path */}
              {loginPath && <MDBContainer fluid className='login-container'>
                    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                      <MDBCol col='12'>
                        <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                            <h4 className="fw-bold mb-2 text-uppercase">Login As:</h4>
                            <div style={{height: 40+'px'}}></div>
                            <div style={{display:"flex",}}>
                              <div>
                                <MDBBtn 
                                  outline className='mx-2 px-5' 
                                  color='white' 
                                  size='lg' 
                                  onClick={handleAdminLogin}
                                >
                                  Admin
                                </MDBBtn>
                              </div>
                              <div>
                                <MDBBtn 
                                  outline className='mx-2 px-5' 
                                  color='white' 
                                  size='lg' 
                                  onClick={handleEmpLogin}
                                >
                                  Employee
                                </MDBBtn>
                              </div>  
                            </div>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                </MDBContainer>}
              {/* Admin Login */}
              {adminLogin && <MDBContainer fluid className='login-container'>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                  <MDBCol col='12'>
          
                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  
                        <p className='text-danger'>{adminError && adminError}</p>
                    
                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Enter admin login credentials!</p>
          
                        <MDBInput 
                          wrapperClass='mb-4 mx-5 w-100' 
                          labelClass='text-white' 
                          onChange={onEmailChange} 
                          label='Email address' 
                          id='formControlLg' 
                          type='email' 
                          size="lg"
                        />
                        <MDBInput 
                          wrapperClass='mb-4 mx-5 w-100' 
                          labelClass='text-white' label='Password' id='formControlLg1' 
                          onChange={onPasswordChange} 
                          type='password' 
                          size="lg"
                        />
          
                        <MDBBtn 
                          outline className='mx-2 px-5' 
                          color='white' 
                          size='lg' 
                          onClick={onSubmitAdminLogin}
                        >
                          Login
                        </MDBBtn>
                        
                        <div>
                          <p className="mb-0">Not an admin? <span onClick={handleEmpLogin} className="text-white-50 fw-bold">Login as an employee</span></p>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                </MDBContainer>}
              {/* Employee Login */}
              {empLogin && <MDBContainer fluid className='login-container'>
                <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                  <MDBCol col='12'>
          
                    <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
                      <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                  
                        <p className='text-danger'>{employeeError && employeeError}</p>
                    
                        <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                        <p className="text-white-50 mb-5">Enter employee login credentials!</p>
          
                        <MDBInput 
                          wrapperClass='mb-4 mx-5 w-100' 
                          labelClass='text-white' 
                          onChange={onEmailChange} 
                          label='Email address' 
                          id='formControlLg' 
                          type='email' 
                          size="lg"
                        />
                        <MDBInput 
                          wrapperClass='mb-4 mx-5 w-100' 
                          labelClass='text-white' label='Password' id='formControlLg1' 
                          onChange={onPasswordChange} 
                          type='password' 
                          size="lg"
                        />
          
                        <MDBBtn 
                          outline className='mx-2 px-5' 
                          color='white' 
                          size='lg' 
                          onClick={ onSubmitEmployeeLogin}
                        >
                          Login
                        </MDBBtn>
                        
                        <div>
                          <p className="mb-0">Not an employee? <span onClick={handleAdminLogin} className="text-white-50 fw-bold">Login as an admin</span></p>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
                </MDBContainer>}
            </>
      
      );
}

export default Login;
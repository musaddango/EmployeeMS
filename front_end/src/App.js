import { useState } from 'react';
import './App.css';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/dashboard/Dashboard';


function App() {

    const [loggedUser, setLogUser] = useState({name:'', email:'',id:''});

    const user =(data)=>{
      setLogUser({name: data.name, email:data.email, id:data.id})
    } 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index path='/' element= {<Login user={user}/>} />
            <Route path='/dashboard' element= {<Dashboard user={loggedUser}/>} />
          </Route>
        </Routes>
      </BrowserRouter>  
    </div>
  );
}

export default App;

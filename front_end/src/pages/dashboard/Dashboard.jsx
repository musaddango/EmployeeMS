import { Outlet } from "react-router-dom";
import SideNavBar from "../../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, } from "react";


export default function Dashboard() {
  // 
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

    useEffect(()=>{
      axios.get("http://localhost:4000/dashboard")
      .then(res => {
        if(!res.data){
          navigate('/')
        }
        if(!res.data === 'success'){
          navigate('/')
        }
      })
    })
    return (
      <div>
        <div className='row d-flex'>
          <div className="col">
            <SideNavBar />
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h2>Employee Management System</h2>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    );
}
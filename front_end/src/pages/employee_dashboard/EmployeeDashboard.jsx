import { Outlet } from "react-router-dom";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EmployeeSideNav from "./EmployeeSideNav";

function EmployeeDashboard(props) {
   // 
  const navigate = useNavigate();
//   const params = useParams();
  axios.defaults.withCredentials = true;
  const [employeeEmail, setEmployeeEmail] = useState(this.props.match.params.email);

    useEffect(()=>{
      axios.get("http://localhost:4000/dashboard")
      .then(res => {
        if(!res.data){
          navigate('/')
        }
        if(!(res.data === 'success')){
          navigate('/')
        }
        console.log(employeeEmail);
        // axios.get('http://localhost:4000/employee_details/'+)
      })
    })

    return (
      <div>
        <div className='row d-flex'>
          <div className="col">
            <EmployeeSideNav />
          </div>
        </div>
        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h2>Employee Dashboard</h2>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    );
}

export default EmployeeDashboard;
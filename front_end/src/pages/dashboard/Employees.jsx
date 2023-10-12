import React, {useState, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Employees() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/getEmployees')
        .then(res => 
            {if(res.statusText === 'OK'){
                console.log(res.data)
                setData(res.data);
            }})
        .catch(err=> console.log(err))
    },[])

    const addEmployee = ()=>{
        navigate('./create')
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <button 
                onClick={addEmployee} 
                className='btn btn-success'>
                    Add Employee
            </button>
            <div>
                <Outlet />
            </div>
            <hr />
            <table style={{width: 80+'%', margin: 'auto'}}>
                <thead>
                    <tr>
                        <th>S/No.</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Salary</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {data.map((emp, index)=>{
                           return <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.image}</td>
                                <td>{emp.email}</td>
                                <td>{emp.address}</td>
                                <td>{emp.salary}</td>
                                <td>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>;
                        })}
                </tbody>
            </table>
            <hr />
        </div>
    );
}

export default Employees;
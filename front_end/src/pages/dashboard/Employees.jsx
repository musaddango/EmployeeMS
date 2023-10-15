import React, {useState, useEffect} from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';

function Employees() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:4000/getEmployees')
        .then(res => 
            {if(res.statusText === 'OK'){
                setData(res.data);
            }})
        .catch(err=> console.log(err))
    },[])

    const addEmployee = ()=>{
        navigate('./create')
    }

    // const handleEdit = (event)=>{
    //     event.preventDefault();
    //     // action
    //     navigate('employee_edit/'+event.target.name)
    // }

    const handleDelete = (event)=>{
        event.preventDefault();

    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            
            <hr />
            <div className='d-flex justify-content-center align-items-center w-70' style={{width: 80+'%', margin: 'auto'}}>
                <table className='table'>
                    <thead>
                        <tr>
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
                                    <td>{
                                        <img 
                                            src={`http://localhost:4000/images/${emp.image}`} 
                                            alt='profileImage'
                                            className='employeeImage'
                                        />
                                        }
                                    </td>
                                    <td>{emp.email}</td>
                                    <td>{emp.address}</td>
                                    <td>{emp.salary}</td>
                                    <td>
                                        <Link 
                                            to={'employee_edit/'+emp.id}
                                            className='btn btn-success m-1' 
                                            name={emp.id}
                                        >
                                            Edit
                                        </Link>
                                        <Link 
                                            className='btn btn-danger m-1' 
                                            name={emp.id} 
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>;
                            })}
                    </tbody>
                </table>
            </div>
            <hr />
            <button 
                onClick={addEmployee} 
                className='btn btn-success'>
                    Add Employee
            </button>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Employees;
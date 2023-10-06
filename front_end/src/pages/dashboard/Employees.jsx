import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function Employees() {
    const navigate = useNavigate();

    const addEmployee = ()=>{
        navigate('./create')
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <hr />
            <button 
                onClick={addEmployee} 
                className='btn btn-success' >
                    Add Employee
            </button>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default Employees;
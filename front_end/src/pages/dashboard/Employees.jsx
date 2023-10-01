import React from 'react';
import { Link } from 'react-router-dom';

function Employees() {
    
    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            <hr />
            <Link to='./create' 
                className='btn btn-success' >
                    Add Employee
            </Link>
        </div>
    );
}

export default Employees;
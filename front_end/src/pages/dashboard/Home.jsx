import React from 'react';

function Dashboardhome({ user }) {
    return (
        <div>
            {/* Admin Section upper section */}
            <div className='p-3 d-flex justify-content-around mt-3'>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div cclassName='text-center pb-1'>
                    <h4>Admin</h4>
                </div>
                <hr />
                <div className=''>
                    <h5>Total: {}</h5>
                </div> 
            </div>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div cclassName='text-center pb-1'>
                    <h4>Employees</h4>
                </div>
                <hr />
                <div className=''>
                    <h5>Total: {}</h5>
                </div> 
            </div>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div cclassName='text-center pb-1'>
                    <h4>Salary</h4>
                </div>
                <hr />
                <div className=''>
                    <h5>Total: {}</h5>
                </div> 
            </div>
        </div>
        {/* Table  */}
        <div style={{width: "30%"}}>
            <h2>List of Admins</h2>  
            <table className='table'>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>          
        </div>
        </div>
        
    );
}

export default Dashboardhome;
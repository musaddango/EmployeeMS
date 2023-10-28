import { useEffect, useState } from "react";
import axios from "axios";

function Dashboardhome({user}) {
    //Employee dashboard variables
    const [empCount, setEmpNo] = useState('');
    const [empSalary, setEmployeeSalary] = useState('');
    const [adminCount, setAdminCount] = useState('');
    const [adminDetails, setAdminDetails] = useState('')

    useEffect(()=>{
        //Employee count details fetch
        axios.get('http://localhost:4000/employeeCount')
        .then((data) => {
            console.log('Employee count fetch')
            if(data.statusText === "OK"){
                setEmpNo(data.data.data[0].ID)
            }else{
                setEmpNo('Failed to fetch no. of employee')
            }
        })
        .catch((err)=> {
            throw new Error(`Couldn't fetch no of employees.`)
        })

        //Employee Salary data fetch
        axios.get('http://localhost:4000/employeeSalary')
        .then((data) => {
            console.log('Salary call')
            if(data.statusText === "OK"){
                setEmployeeSalary(data.data.data[0].salary)
            }else{
                setEmployeeSalary('Failed to fetch no. of employee')
            }
        })
        .catch((err)=> {
            throw new Error(`Couldn't fetch salary of employees.`)
        })

        //Admin count data
        axios.get('http://localhost:4000/adminCount')
        .then((data) => {
            console.log(data.data.data[0].ID)
            if(data.statusText === "OK"){
                setAdminCount(data.data.data[0].ID)
            }else{
                setAdminCount('Failed to fetch no. of Admins')
            }
        })
        .catch((err)=> {
            throw new Error(`Couldn't fetch no. of Admin.`)
        })

        // Admin data
         axios.get('http://localhost:4000/adminDetails')
            .then((data) => {
                    setAdminDetails(data.data.data)
            })
            .catch((err)=> {
                throw new Error(`Couldn't fetch admin details`)
            })
    }, [])

    return (
        <div>
            {/* Admin Section upper section */}
            <div className='p-3 d-flex justify-content-around mt-3'>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div className='text-center pb-1'>
                    <h4>Admin</h4>
                </div>
                <hr />
                <div className=''>
                    <h5>Total: {adminCount}</h5>
                </div> 
            </div>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div className='text-center pb-1'>
                    <h4>Employees</h4>
                </div>
                <hr />
                <div className=''>
                    <h5>Total: {empCount}</h5>
                </div> 
            </div>
            <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
                <div className='text-center pb-1'>
                    <h4>Salary</h4>
                </div>
                <hr />
                <div className=''>
                    <h5>Total: {empSalary}</h5>
                </div> 
            </div>
        </div>
        <hr />
        <h2>List of Admins</h2> 
        <hr /> 
        {/* Table  */}
        <div style={{width: "70%", margin:"auto"}}>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                {adminDetails.map((item) => {
                    return <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                    </tr>
                })}
             </tbody>
            </table>          
        </div>
        </div>
        
    );
}

export default Dashboardhome;
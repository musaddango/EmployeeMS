import React, {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import './Employees.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CreateAccount from './modals/CreateAccount';
import Delete from './modals/Delete';
import EditEmployee from './EditEmployee';



function Employees() {

    
    // Edit Modal variables
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const onOpenModal = (event) => {
        event.preventDefault();
        getEditDetails(event);
    };
    const onCloseModal = () => setOpen(false);
    const [editDetails, setEditDetails] = useState({
        name:'',
        email:'',
        address:'',
        password: '',
        salary: '',
    })

    // Fetch the data to be of the employer to be edited
    const getEditDetails = (event)=>{
        axios.post('http://localhost:4000/user_details',{id: event.target.name})
        .then(data=> {
            if(data.statusText==="OK"){
                setEditDetails({
                    id: data.data[0].id,
                    name:data.data[0].name,
                    email: data.data[0].email,
                    address:data.data[0].address,
                    password: data.data[0].password,
                    salary: data.data[0].salary,
                                })
            }
        })
        .then(()=> setOpen(true))
        .catch(err => console.log(`Fetch to edit route failed`))
    }

    // Delete
    const [del, setDel] = useState(false);
    const [delID, setDelID] = useState('');
    const onOpenDelModal = () => setDel(true);
    const onCloseDelModal = () => setDel(false);
    const [delName, setDelName] = useState('');

    const delToggle = (event)=>{
        event.preventDefault();
        onOpenDelModal();
        setDelID(event.target.name);
        
        //Fetch and set Employee Delete name 
        axios.post('http://localhost:4000/user_details', {id: event.target.name})
        .then(data=> setDelName(data.data[0].name))
        .catch((data)=> console.log('Error setting name'))
        
    }
    
    // Create
    const [create, setCreate] = useState(false);
    const onOpenCreateModal = () => setCreate(true);
    const onCloseCreateModal = () => setCreate(false);



    useEffect(()=>{
        axios.get('http://localhost:4000/getEmployees')
        .then(res => 
            {if(res.statusText === 'OK'){
                setData(res.data);
            }
        })
        .catch(err=> console.log(err))
    },[])

    return (

        <>
         <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            
            <hr />

            {<div className='d-flex justify-content-center align-items-center w-70' style={{width: 80+'%', margin: 'auto'}}>
                {/* Employee table - with their details */}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Map and fill up data for the employee page. */}
                            {data.map((emp, index)=>{
                                    return <tr key={emp.id}>
                                        <td>{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{<img 
                                                src={`http://localhost:4000/images/${emp.image}`} 
                                                alt='profileImage'
                                                className='employeeImage'
                                            />}
                                        </td>
                                        <td>{emp.email}</td>
                                        <td>{emp.address}</td>
                                        <td>{emp.salary}</td>
                                        <td>
                            {/* Edit and Delete Buttons */}
                                        <button 
                                            onClick={onOpenModal}
                                            className='btn btn-success m-1' 
                                            name={emp.id}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className='btn btn-danger m-1' 
                                            name={emp.id} 
                                            onClick={delToggle}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>;
                            })}
                    </tbody>
                </table>
            </div>}

            <hr />
            <button 
                onClick={onOpenCreateModal} 
                className='btn btn-success'>
                    Add Employee
            </button>
            <div> 
                <Outlet />
            </div>
        </div>
        {/* Edit Modal Section */}
        {open && (
                    <Modal open={open} onClose={onCloseModal} center>
                        <div style={{width: 600+"px"}}></div>
                        <EditEmployee data = {editDetails} closeModal={onCloseModal} />
                    </Modal>
                
                )}

        {/* Delete Modal Section */}
            {del && (
                <Modal open={del} onClose={onCloseDelModal} center>
                    <Delete id={delID} name={delName} closeModal={onCloseDelModal} />
                </Modal>
            )}

        {/* Create Modal Section */}
            {create && (
                <Modal open={create} onClose={onCloseCreateModal} center style={{width: 60+"%"}}>
                    <div style={{width: 600+"px"}}></div>
                    <h3>Create Employee</h3>
                    <CreateAccount display={onCloseCreateModal} />
                </Modal>
            )}
        </>
        
    );
}

export default Employees;
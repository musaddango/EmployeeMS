import React, {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import './Employees.css';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import CreateAccount from './modals/CreateAccount';
import Delete from './modals/Delete';


function Employees() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    // Edit Modal
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [empDetails, setEmpDetails] = useState({
                name:'',
                email:'',
                address:'',
                password: '',
                salary: null,
                image: null
            })
    const [editDetails, setEditDetails] = useState({
        id: null,
        name:'',
        email:'',
        address:'',
        password: '',
        salary: null,
        image: null
    })

    // Edit Details Function
    const onEdit = (event)=>{
        event.preventDefault();

        axios.post('http://localhost:4000/edit_details',{id:event.target.name})
        .then(data=> setEditDetails({
                id: data.data[0].id,
                name:data.data[0].name,
                email: data.data[0].email,
                address:data.data[0].address,
                password: data.data[0].password,
                salary: data.data[0].salary,
                image: data.data[0].name.image
                            })
        )
        .then(data => onOpenModal())
        .catch(err => console.log(`Fetch to edit route failed`))
    }

    const submitEdit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:4000/edit',editDetails)
        .then(data=> console.log(data))
    }

    // Delete
    const [del, setDel] = useState(false);
    const [delID, setDelID] = useState('');
    const onOpenDelModal = () => setDel(true);
    const onCloseDelModal = () => setDel(false);

    const delToggle = (event)=>{
        event.preventDefault();
        onOpenDelModal();
        setDelID(event.target.name);
    }
    
    // Create
    const [create, setCreate] = useState(false);
    const onOpenCreateModal = () => setCreate(true);
    const onCloseCreateModal = () => setCreate(false);

    // Creation Function
    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", empDetails.name);
        formData.append("email", empDetails.email);
        formData.append("address", empDetails.address);
        formData.append("password", empDetails.password);
        formData.append("image", empDetails.image);
        formData.append("salary", empDetails.salary)

        axios.post('http://localhost:4000/create', formData)
        .catch(err => console.log(err));
        onCloseModal();
    }


    useEffect(()=>{
        axios.get('http://localhost:4000/getEmployees')
        .then(res => 
            {if(res.statusText === 'OK'){
                setData(res.data);
            }})
        .catch(err=> console.log(err))
    },[])

    const addEmpModal = ()=>{
        // navigate('./create');
    }


    const handleDelete = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:4000/delete',)
    }

    return (

        <>
         <div className='px-5 py-3'>
            <div className='d-flex justify-content-center'>
                <h3>Employee List</h3>
            </div>
            
            <hr />
            <div className='d-flex justify-content-center align-items-center w-70' style={{width: 80+'%', margin: 'auto'}}>
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
                                        <button 
                                            onClick={onEdit}
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
            </div>
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
                <div>
                    <h3>Edit Your Profile</h3>
                    <form onSubmit={handleSubmit} id="form">
                        <div className="form-group p-2">
                            <input 
                                onChange={event=> setEditDetails({...editDetails, name:event.target.value})}
                                type="text" 
                                name="name"
                                className="form-control" 
                                id="Name" 
                                aria-describedby="address" 
                                value={editDetails.name} 
                                autoComplete="on"
                                style={{marginTop:"5px", marginBottom:"5px"}}
                            />
                        </div>
                        <div className="form-group p-2">
                            <input 
                                onChange={event=> setEditDetails({...editDetails, email: event.target.value})}                                    
                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    value={editDetails.email} 
                                    autoComplete="on"
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event=>setEditDetails({...editDetails, salary:event.target.value})}
                                    type="number" 
                                    name="salary"
                                    className="form-control" 
                                    id="exampleInputSalary" 
                                    value={editDetails.salary} 
                                    autoComplete="on"
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event=> setEditDetails({...editDetails, address: event.target.value})}
                                    type="text" 
                                    name="address"
                                    className="form-control" 
                                    id="address" 
                                    aria-describedby="address" 
                                    value={editDetails.address}
                                    autoComplete="no" 
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event => setEditDetails({...editDetails, password: event.target.value})}
                                    type="password" 
                                    name="password"
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Enter new password"
                                    autoComplete="new-password" 
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>

                            <button 
                                onClick={submitEdit}
                                type="submit" 
                                className="btn btn-success" 
                                style={{marginTop:"5px", marginBottom:"5px"}}>
                                    Edit Details
                            </button>
                        </form>
                    </div>
            </Modal>)}

        {/* Delete Modal Section */}
            {del && (
                <Modal open={del} onClose={onCloseDelModal} center>
                    <Delete id={delID} />
                </Modal>
            )}

        {/* Create Modal Section */}
        {create && (
            <Modal open={create} onClose={onCloseCreateModal} center style={{width: 60+"%"}}>
       
                <h3>Create Employee</h3>
                <CreateAccount />
     
        </Modal>
        )}
        </>
        
    );
}

export default Employees;
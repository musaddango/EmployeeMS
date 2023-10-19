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
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    // Edit Modal
    const [editId, setEditId] = useState('');
    const onOpenModal = (event) => {
        event.preventDefault();
        setEditId(event.target.name);
        setOpen(true)
    };
    const onCloseModal = () => setOpen(false);




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
            }})
        .catch(err=> console.log(err))
    },[])

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
                    <EditEmployee id={editId}/>
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
                <h3>Create Employee</h3>
                <CreateAccount />
            </Modal>
        )}
        </>
        
    );
}

export default Employees;
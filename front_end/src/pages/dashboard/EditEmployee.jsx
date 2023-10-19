import { useState, useEffect } from "react";
import axios from 'axios';

function EditEmployee({ id }) {
   
    const submitEdit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:4000/edit',editDetails)
        .then(data=> console.log(data))
    }
// Edit Modal
const [editDetails, setEditDetails] = useState({
    name:'',
    email:'',
    address:'',
    password: '',
    salary: '',
})

// Fetch the data to be of the employer to be edited
useEffect(()=>{
    axios.post('http://localhost:4000/user_details',{id: id})
    .then(data=> setEditDetails({
            id: data.data[0].id,
            name:data.data[0].name,
            email: data.data[0].email,
            address:data.data[0].address,
            password: data.data[0].password,
            salary: data.data[0].salary,
                        })
    )
    .catch(err => console.log(`Fetch to edit route failed`))
})


    
    return (
                <div>
                    <h3>Edit Your Profile</h3>
                    <form id="form">
                        <div className="form-group p-2">
                            <input 
                                onChange={event=> setEditDetails({...editDetails, name:event.target.value})}
                                type="text" 
                                name="name"
                                className="form-control" 
                                id="name" 
                                aria-describedby="address" 
                                placeholder={editDetails.name} 
                                autoComplete="on"
                                style={{marginTop:"5px", marginBottom:"5px"}}
                                disabled
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
                                    placeholder={editDetails.email} 
                                    autoComplete="on"
                                    style={{marginTop:"5px", marginBottom:"5px"}}
                                    disabled 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event=>setEditDetails({...editDetails, salary:event.target.value})}
                                    type="number" 
                                    name="salary"
                                    className="form-control" 
                                    id="exampleInputSalary" 
                                    placeholder={editDetails.salary} 
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
                                    placeholder={editDetails.address}
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
                                    placeholder="New employee password"
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
    );
}

export default EditEmployee;
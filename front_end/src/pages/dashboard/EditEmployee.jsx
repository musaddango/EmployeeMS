import { useState } from "react";
import axios from 'axios';

function EditEmployee({ data, closeModal }) {
   
    const [editDetails, setEditDetails] = useState(data);

    const submitEdit = (event)=>{
        event.preventDefault();
        axios.post('http://localhost:4000/edit',editDetails)
        .then((data)=> {
            if (data.data === "success"){
                closeModal()
            }
        })
        .catch((err)=> console.log(`Error: error making client side request`))
    }
    
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
                                value={editDetails.name} 
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
                                    value={editDetails.email} 
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
                                    placeholder="Enter new employee password (optional)"
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
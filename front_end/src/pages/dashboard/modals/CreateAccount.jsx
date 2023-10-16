import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccount({ display }) {
    const [empDetails, setEmpDetails] = useState({
        name:'',
        email:'',
        address:'',
        password: '',
        salary: null,
        image: null
    })

    const navigate = useNavigate();

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
        navigate(-1)
    }

    return(
            <div>
                    <form onSubmit={handleSubmit} id="form">
                        <div className="form-group p-2">
                            <input 
                                onChange={event=> setEmpDetails({...empDetails, name:event.target.value})}
                                type="text" 
                                name="name"
                                className="form-control" 
                                id="Name" 
                                aria-describedby="address" 
                                placeholder="Enter Name" 
                                autoComplete="on"
                                style={{marginTop:"5px", marginBottom:"5px"}} 
                            />
                        </div>
                        <div className="form-group p-2">
                            <input 
                                onChange={event=> setEmpDetails({...empDetails, email: event.target.value})}                                    type="email" 
                                    name="email"
                                    className="form-control" 
                                    id="exampleInputEmail1" 
                                    aria-describedby="emailHelp" 
                                    placeholder="Enter email" 
                                    autoComplete="on"
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event=>setEmpDetails({...empDetails, salary:event.target.value})}
                                    type="number" 
                                    name="salary"
                                    className="form-control" 
                                    id="exampleInputSalary" 
                                    placeholder="Employee Salary" 
                                    autoComplete="on"
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event=> setEmpDetails({...empDetails, address: event.target.value})}
                                    type="text" 
                                    name="address"
                                    className="form-control" 
                                    id="address" 
                                    aria-describedby="address" 
                                    placeholder="Enter address"
                                    autoComplete="no" 
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group p-2">
                                <input 
                                    onChange={event => setEmpDetails({...empDetails, password: event.target.value})}
                                    type="password" 
                                    name="password"
                                    className="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Password"
                                    autoComplete="new-password" 
                                    style={{marginTop:"5px", marginBottom:"5px"}} 
                                />
                            </div>
                            <div className="form-group d-flex justify-content-start p-2">
                                <input 
                                    onChange={event=> setEmpDetails({...empDetails, image:event.target.files[0]})}
                                    type="file" 
                                    name="image" 
                                    accept="image/*" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-success" 
                                style={{marginTop:"5px", marginBottom:"5px"}}>
                                    Create Employee
                            </button>
                            
                        </form>
                    </div>
            )
}

export default CreateAccount;
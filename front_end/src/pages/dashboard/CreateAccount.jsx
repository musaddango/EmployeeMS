import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccount() {

    const [empDetails, setEmpDetails] = useState({
        name:'',
        email:'',
        address:'',
        password: '',
        image: null
    })

    const navigate = useNavigate();
    const onChange = (event) =>{
        if (event.target.name === "email"){
            setEmpDetails({...empDetails, email: event.target.value});
        }else if(event.target.name === "password"){
            setEmpDetails({...empDetails, password: event.target.value});
        }else if(event.target.name === "address"){
            setEmpDetails({...empDetails, address: event.target.value});
        }else if(event.target.name === "image"){
            setEmpDetails({...empDetails, image:event.target.files[0]});
        }else if(event.target.name === "name"){
            setEmpDetails({...empDetails, name:event.target.value});
        }
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", empDetails.name);
        formData.append("email", empDetails.email);
        formData.append("address", empDetails.address);
        formData.append("password", empDetails.password);
        formData.append("image", empDetails.image);

        axios.post('http://localhost:4000/create', formData)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        console.log(empDetails);
        navigate(-1)
    }
    return (
        <div className="regform" style={{width:"40%", margin: "auto"}}>
            <form onSubmit={handleSubmit} id="form">
            <div className="form-group p-2">
                    <input 
                        onChange={onChange}
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
                        onChange={onChange}
                        type="email" 
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
                        onChange={onChange}
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
                        onChange={onChange}
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
                        onChange={onChange}
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
    );
}

export default CreateAccount;
import { useState } from "react";
// import axios from "axios";
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
        // axios.post(empDetails)
        console.log(empDetails);
        navigate(-1)
    }
    return (
        <div className="regform" style={{width:"30%", margin: "auto"}}>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <input 
                        onChange={onChange}
                        type="text" 
                        name="name"
                        className="form-control" 
                        id="Name" 
                        aria-describedby="address" 
                        placeholder="Enter Name" 
                        style={{marginTop:"5px", marginBottom:"5px"}} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        onChange={onChange}
                        type="email" 
                        name="email"
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        style={{marginTop:"5px", marginBottom:"5px"}} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        onChange={onChange}
                        type="text" 
                        name="address"
                        className="form-control" 
                        id="address" 
                        aria-describedby="address" 
                        placeholder="Enter address" 
                        style={{marginTop:"5px", marginBottom:"5px"}} 
                    />
                </div>
                <div className="form-group">
                    <input 
                        onChange={onChange}
                        type="password" 
                        name="password"
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        style={{marginTop:"5px", marginBottom:"5px"}} 
                    />
                </div>
                <div className="form-group d-flex">
                    <input 
                        onChange={onChange}
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        placeholder="choose image" 
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
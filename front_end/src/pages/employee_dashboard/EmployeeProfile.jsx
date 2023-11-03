import "./employee_style.css";
import { useLoaderData } from "react-router-dom";

function EmployeeProfile() {
    const param = useLoaderData();
    console.log(param);

    return (
        <div>
            <div>
                <img src={''} alt="Employee profile" />
            </div>
            <div className="detail-container">
                <div className="name-div datail"></div>
                <div className="email-div detail"></div>
                <div className="address-div detail"></div>
            </div>
        </div>
    );
}

export function Loader(params){
    console.log(params);
    try{
      fetch('http://localhost:4000/employee_profile/'+ params.email)
      .then((res)=>{
        console.log(res);
        return res;
      })
      .catch(err => new Error(`New error`))
    // const data = await res.json;

    }catch(err){
      throw new Error('Operation failed on employee profile loader');
    }
    
  }


export default EmployeeProfile;
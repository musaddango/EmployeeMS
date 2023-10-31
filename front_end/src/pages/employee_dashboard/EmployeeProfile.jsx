import "./employee_style.css";

function EmployeeProfile({details}) {

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

export default EmployeeProfile;
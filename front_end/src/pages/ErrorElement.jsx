import { Link } from "react-router-dom";

function ErrorElement(props) {
    return (
        <div>
            <h2>Error Page</h2>
            <p>Sorry, something went wrong. \n Click <Link to={"/employee_dashboard"}>here</Link>  to go back to the Employee Dashboard</p>
        </div>
    );
}

export default ErrorElement;
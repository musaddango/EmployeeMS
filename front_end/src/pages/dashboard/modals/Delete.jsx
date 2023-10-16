import axios from "axios";


function Delete({ id }) {

    const del = ()=>{
        axios.post('http://localhost:4000/delete', {id: id})
        .then((data)=> console.log(data))
        .catch(err=> console.log(`Error deleting an employee`))
    }

    return (
        <div>
            <h3>Delete Employee</h3>
            <p>Delete the employee with the following details:
            <br />
            Name: {} <br />
            user ID: {}</p>

            <button className="btn btn-success" onClick={del}>Delete Employee</button>

        </div>
    );
}

export default Delete;
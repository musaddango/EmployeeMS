import axios from "axios";


function Delete({ id, name, closeModal }) {

    const del = ()=>{
        axios.post('http://localhost:4000/delete', {id: id})
        .then((data)=> {if(data.data === 'success'){
            closeModal();
        }})
        .catch(err=> console.log(`Error deleting an employee`))
    }

    return (
        <div>
            <h3>Delete Employee</h3>
            <p>Delete the employee with the following details:
            <br />
            Name: {name} <br />
            user ID: {id}</p>

            <button className="btn btn-success" onClick={del}>Delete Employee</button>

        </div>
    );
}

export default Delete;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db, } from '../server.js';

// employee login controller
export function employeeLogin(req, res){
  const {email, password } = req.body;

  // Input check
  if (!email || !password){
    console.log(`invalid login input.`)
    return res.json(`invalid input`);
  }
  // Fetch user detail from the database
  db.select('*')
    .from('employees')
    .where({email: email,})       
    .then(data => {
      //
      if(data.length> 0){
        console.log(`employee/login controller ${data[0]}`)
        bcrypt.compare(password, data[0].password, function(err, result) {
          if (err) {
                    res.status(401).send('Unauthorized');
                  } else {
                    const { id } = data[0];
                    // JWT Signed token for authentication and protection of server routes.
                    const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '1 day'});
                    res.cookie("token", token);
                    return res.json({status: 'success', data: {...data[0], password: null}});
                  }
        });
        }
    })
    .catch(err => res.status(400).json(`bad request`));
}

//  employee/create controller
export function creatEmployee(req, res){ 
  const {name, email, address, password, salary} = req.body;

  if (!name || !email || !password){
    console.log(`some of the employee field(s) are empty.`)
    return res.json(`some of the employee field(s) are empty.`)
  }
  // Password hashing
  bcrypt.hash(password.toString(), 10, (err, result)=>{
  if(err) return res.json(`Error hashing password`);
    db('employees').insert({
      name: name,
      email: email,
      address: address,
      password: result,
      salary: salary,
      image: req.file.filename
    })
    .then(() =>{ 
      console.log(`Congratulations. ${name}'s registration was successful`);
      return res.json(`success`)
    })
    .catch(err =>{ 
      console.log(`Error Registering Employee.`);
      return res.json(`Error`);
    })
  }
)
}

// GET /employee/details
export function getEmployeeDetails(req, res){
  db.select('*')
  .from('employees')
  .then(data=> res.json(data)) 
  .catch(err=> res.json(`Error getting employee data`))
}

// POST /employee/details
export function postEmployeeDetails(req, res){
  const { id } = req.body;
  db.select('*')
  .from('employees')
  .where('id', id)
  .then(data=> res.json(data))
  .catch(err=>res.json(`Error accessing employee data`))
}

// /employee/edit'
export function employeeEdit(req, res){
  const { name, email, salary, address, password, id } = req.body;

  if(password){
    bcrypt.hash(password, 10, (err, result)=>{
      if(err) return res.json('Error updating password.');
    db
    .from('employees')
    .where('id', id)
    .update({ 
      name: name,
      salary: salary,
      email: email,
      address: address,
      password: result
    })  
    .then(()=>{ 
      res.json(`success`); 
  })
    .catch(err=> console.log(`Failed to update user details.`))
    })
  }else{
    db
    .from('employees')
    .where('id', id)
    .update({ 
      name: name,
      salary: salary,
      email: email,
      address: address,
    })  
    .then(()=> res.json(`success`))
    .catch(err=> console.log(`Failed to update user details.`))
    }
  }

// employee/delete/:id controller
export function employeeDelete(req, res){
    const { id } = req.params;
    db
    .from('employees')
    .where('id', id)
    .del()
    .then(()=> res.json(`delete success`))
    .catch((err)=> res.json('delete error'))
  }

// 'employee/count'
export function employeeCount(req, res){
    db
    .from('employees')
    .count('id as ID')
    .then(data=> {
      res.json({status: 'success',data: data})
    })
    .catch(err => res.json('Error fetching no. of users'))
  }

// employee/salary controller
export function employeeSalary(req, res){
    db
    .from('employees')
    .sum('salary as salary')
    .then(data=> {
      res.json({status: 'success',data: data})
    })
    .catch(err => res.json('Error fetching no. of users'))
  }

  // employee/profile
export function employeeProfile(req, res){
    const { email } = req.params;
    console.log(`/employee_profile/:email: `,email)  
    if(!email){
      console.log(`No email sent with request on the emp profile endpoint`);
    }
    db.select('name', 'email', 'id')
    .from('employee')
    .where('email', email)
    .then((data)=> console.log(`Employee_profile route: `,data))
  }
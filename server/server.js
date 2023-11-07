import express from "express";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import cookieParser from "cookie-parser";
import 'dotenv/config'


import { dashboard } from "./controllers/dashboard.controllers.js";
import { logout } from "./controllers/logout.controller.js";

import { employeeRouter } from "./routers/employee.router.js";


// Knex database setup
export const db = knex({ 
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432, 
      user : 'postgres',
      password : 'Musa12***',
      database : 'admin_dashboard_db'
    }
  });
const app = express();

// Middlewares 
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); 

// Verification of JWT token function.
export function verifyUser(req, res, next){
  const token = req.cookies.token;
  if (!token){
    return res.json({Error: `no verification token`});
  }
  jwt.verify(token, "jwt-secret-key",(err, decoded)=>{
  if(err){
    console.log(`Error verifying token`)
    return res.json(`authentication fail`)
  };
  next();
   })
}

// Employee routes
app.use(`/employee`,employeeRouter);

// Admin routes


// Dahsboard details
app.get('/dashboard',verifyUser, dashboard);
// Logout
app.get('/logout', logout)



// Formerly 'employee_login'
// app.post('employee/login', function adminLogin(req, res){
//     const {email, password } = req.body;
//     // Input check
//     if (!email || !password){
//       return res.json(`invalid input`);
//     }
//     // Fetch user detail from the database
//     db.select('*')
//       .from('admin')
//       .where({email: email,})      
//       .then(data => {
//         console.log(data[0])
//         if(data.length> 0){
//           bcrypt.compare(password, data[0].password, function(err, result) {
//             if (err) res.json(new Error('Error accessing database'));
//             const id = data[0].id;
//             // JWT Signed token for authentication and protection of server routes.
//             const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '1 day'});
//             res.cookie("token", token);
//             return res.json({status: 'login success', data: {...data[0], password: null}});
        
//         });
//           }
//       })
//       .catch(err => res.json({Status:'Error'}));
// })



const port =  4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})


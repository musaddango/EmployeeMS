import express from "express";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path"; 
import 'dotenv/config'

import { creatEmployee, employeeCount, employeeDelete, employeeEdit, employeeLogin, employeeProfile, employeeSalary, getEmployeeDetails, postEmployeeDetails } from "./controllers/employees.controllers.js";
import { adminCount, adminDetails, adminLogin } from "./controllers/admin.controllers.js";
import { dashboard } from "./controllers/dashboard.controllers.js";
import { logout } from "./controllers/logout.controller.js";

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

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/images');
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname + Date.now() + '_' + path.extname(file.originalname));
  }
})
const upload = multer({storage: storage});

// Login
app.post('/employee/login', employeeLogin)
app.post('/admin/login', adminLogin)

// Verification of JWT token function.
function verifyUser(req, res, next){
  const token = req.cookies.token;
  if (!token){
    console.log(`no token`)
    return res.json({Error: `no verification token`});
  }
  jwt.verify(token, "jwt-secret-key",(err, decoded)=>{
  if(err) return res.json(`authentication fail`);
  next();
   })
}

app.get('/dashboard',verifyUser, dashboard);

// formerly '/create'
app.post('/employee/create', upload.single('image'), creatEmployee)

// Formerly, '/getEmployee'
app.get('/employee/details', verifyUser, getEmployeeDetails)

// Formerly '/user_details'
app.post('/employee/details', verifyUser, postEmployeeDetails);

// Formerly '/edit'
app.post('/employee/edit', verifyUser, employeeEdit)

// Formerly '/delete/:id'
app.delete('employee/delete/:id', verifyUser, employeeDelete)

app.get('/logout', logout)

// Formerly '/employeeCount'
app.get('/employee/count', employeeCount)

// Formerly '/employeeSalary';
app.get('/employee/salary', employeeSalary)

// Formerly, '/adminCount'
app.get('/admin/count', adminCount)

// Formerly 'adminDetails'
app.get('/admin/details', adminDetails)

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

// Formerly '/employee_profile/:email'
app.get('/employee/profile/:email', employeeProfile)


const port =  4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})


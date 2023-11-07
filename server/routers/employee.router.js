import express from 'express';
import path from 'node:path';

import multer from "multer";
import { verifyUser } from '../server.js';
import { creatEmployee, 
        employeeCount, 
        employeeDelete, 
        employeeEdit, 
        employeeLogin, 
        employeeProfile, 
        employeeSalary, 
        getEmployeeDetails, 
        postEmployeeDetails } from "../controllers/employees.controllers.js";

export const employeeRouter = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
      cb(null, 'public/images');
    },
    filename: (req, file, cb) =>{
      cb(null, file.fieldname + Date.now() + '_' + path.extname(file.originalname));
    }
  })
  export const upload = multer({storage: storage});

// Login
employeeRouter.post('/login', employeeLogin)
// Formerly, '/getEmployee'
employeeRouter.get('//details', verifyUser, getEmployeeDetails);
// Formerly '/create'
employeeRouter.post('/create', upload.single('image'), creatEmployee);
// Formerly '/user_details'
employeeRouter.post('/details', verifyUser, postEmployeeDetails);
// Formerly '/edit'
employeeRouter.post('/edit', verifyUser, employeeEdit)
// Formerly '/delete/:id'
employeeRouter.delete('/delete/:id', verifyUser, employeeDelete)
// Formerly '/employeeCount'
employeeRouter.get('/count', employeeCount)
// Formerly '/employeeSalary';
employeeRouter.get('/salary', employeeSalary)
// Formerly '/employee_profile/:email'
employeeRouter.get('/profile/:email', employeeProfile)

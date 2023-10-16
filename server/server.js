import express from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path"; 

const db = knex({ 
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
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'public/images');
  },
  filename: (req, file, cb) =>{
    cb(null, file.fieldname + Date.now() + '_' + path.extname(file.originalname));
  }
})

const upload = multer({storage: storage});

app.post('/login', (req, res)=>{
    db.select('*')
      .from('login')
      .where({email: req.body.email,
               password: req.body.password}
      )      
      .then(data => {
        if(data.length > 0){
          res.json({status: 'success', data: data[0]});
        }else{
          res.json({status: 'error', error: 'Email or password invalid'}); 
        }

      })
      .catch(err => console.log('Error'));
})

app.post('/create', upload.single('image'), (req, res)=>{ 
    const {name, email, address, password, salary} = req.body;

    bcrypt.hash(password.toString(), 10, (err, result)=>{
    if(err) return res.json(`There was an error storing data`);
      db('employees').insert({
        name: name,
        email: email,
        address: address,
        password: result,
        salary: salary,
        image: req.file.filename
      })
      .returning('name')
      .then(res => console.log(`Congratulations. ${name}'s registration was successful`))
      .catch(err => console.log(`Error Registering Employee.`))
    }
  )
})

app.get('/getEmployees', (req, res)=>{
  db.select('*')
  .from('employees')
  .then(data=> res.json(data)) 
  .catch(err=> res.json(`Error getting employee data`))
})

app.post('/user_details', (req, res)=>{
  const {id} = req.body;
  db.select('*')
  .from('employees')
  .where('id', id)
  .then(data=> res.json(data))
  .catch(err=>res.json(`Error accessing employee data`))

})

app.post('/edit', (req, res)=>{
  const { name, email, salary, address, password, id } = req.body;

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
  .then(()=> console.log(`fetching user details success`))
  .catch(err=> console.log(`Failed to get user details.`))
  })
  
})

app.post('/delete', (req, res)=>{
  const { id } = req.body;
  db
  .from('employees')
  .where('id', id)
  .del()
  .then(()=> res.json(`success`))
  .catch((err)=> res.json('error'))
})

const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
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
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
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
    const {email, password } = req.body;
    db.select('*')
      .from('login')
      .where({email: email,
               password: password}
      )      
      .then(data => {
        if(data.length > 0){

          const id = data[0].id;
          
          // JWT Sign
          const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '15s'});
          res.cookie("token", token);
          console.log(token);
          return res.json({status: 'success', data: data[0]});
        }else{
          return res.json({status: 'error', error: 'Email or password invalid'}); 
        }

      })
      .catch(err => res.json('Error'));
})

function verifyUser(req, res, next){
  const token = req.cookies.token;
  if (!token){
    return res.json({Error: `Verification error`})
  }
  else{
      jwt.verify(token, "jwt-secret-key",(err, decoded)=>{
      if(err) return res.json(`You do not have access to this resources`);
      next();
    })
  }
}
 
app.get('/dashboard',verifyUser, (req, res)=>{
    res.json(`success`)
})

app.post('/create', upload.single('image'), (req, res)=>{ 
    const {name, email, address, password, salary} = req.body;

    if (!name || !email || !password){
      console.log(`some of the employee field(s) are empty.`)
      return res.json(`some of the employee field(s) are empty.`)
    }

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
  })

app.delete('/delete/:id', (req, res)=>{
  const { id } = req.params;
  db
  .from('employees')
  .where('id', id)
  .del()
  .then(()=> res.json(`delete success`))
  .catch((err)=> res.json('delete error'))
})


const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
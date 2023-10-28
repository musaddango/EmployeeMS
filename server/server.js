import express from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path"; 

// Knex database setup
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

app.post('/login', (req, res)=>{
    const {email, password } = req.body;
    console.log(`email: ${email}; password: ${password}`)
    // Fetch user detail from the database
    db.select('*')
      .from('employees')
      .where({email: email,})      
      .then(data => {
        console.log(data[0])
        if(data.length> 0){
          bcrypt.compare(password, data[0].password, function(err, result) {
            if (err) res.json(new Error('Error accessing database'));
            const id = data[0].id;
            // JWT Signed token for authentication and protection of server routes.
            const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '1 day'});
            res.cookie("token", token);
            return res.json({status: 'login success', data: {...data[0], password: null}});
        
        });
          }
      })
      .catch(err => res.json({Status:'Error'}));
})

// Verification of JWT token function.
function verifyUser(req, res, next){
  const token = req.cookies.token;
  if (!token){
    return res.json({Error: `no verification token`});
  }
  jwt.verify(token, "jwt-secret-key",(err, decoded)=>{
  if(err) return res.json(`authentication fail`);
  next();
   })
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

app.get('/getEmployees', verifyUser, (req, res)=>{
  db.select('*')
  .from('employees')
  .then(data=> res.json(data)) 
  .catch(err=> res.json(`Error getting employee data`))
})

app.post('/user_details', verifyUser, (req, res)=>{
  const {id} = req.body;
  db.select('*')
  .from('employees')
  .where('id', id)
  .then(data=> res.json(data))
  .catch(err=>res.json(`Error accessing employee data`))

})

app.post('/edit', verifyUser, (req, res)=>{
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

app.delete('/delete/:id', verifyUser, (req, res)=>{
  const { id } = req.params;
  db
  .from('employees')
  .where('id', id)
  .del()
  .then(()=> res.json(`delete success`))
  .catch((err)=> res.json('delete error'))
})

app.get('/logout', (req, res) =>{
  res.clearCookie('token');
  return res.json({status: `success`});
})

app.get('/employeeCount', (req, res)=>{
  db
  .from('employees')
  .count('id as ID')
  .then(data=> {
    res.json({status: 'success',data: data})
  })
  .catch(err => res.json('Error fetching no. of users'))
})

app.get('/employeeSalary', (req, res)=>{
  db
  .from('employees')
  .sum('salary as salary')
  .then(data=> {
    res.json({status: 'success',data: data})
  })
  .catch(err => res.json('Error fetching no. of users'))
})

app.get('/adminCount', (req, res)=>{
  db
  .from('admin')
  .count('id as ID')
  .then(data=> {
    res.json({status: 'success',data: data})
  })
  .catch(err => res.json('Error fetching salary of users'))
})

app.get('/adminDetails', (req, res)=>{
  db
  .select('id', 'name', 'email')
  .from('admin')
  .then(data=> {
    res.json({status: 'success',data: data})
  })
  .catch(err => res.json('Error fetching salary of users'))
})



const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
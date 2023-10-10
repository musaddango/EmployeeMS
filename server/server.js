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
app.use(cors());
app.use(express.json());
app.use(cookieParser());

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
  console.log(req.file);
  console.log(req.body);

})

const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
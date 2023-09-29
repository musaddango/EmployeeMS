import { express } from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from 'knex';
import cookieParser from "cookie-parser";


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


app.post('/login', (req, res)=>{
    console.log(req.body);
})
const port = 4000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
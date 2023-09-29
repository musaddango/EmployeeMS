import { express } from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from 'knex';



const app = express();
app.use(cors());
app.use(express());
app.use(jwt());



app.post('/login', (req, res)=>{
    console.log(req.body);
})
const port = 3000;
app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})
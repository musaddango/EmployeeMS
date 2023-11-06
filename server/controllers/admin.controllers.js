import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { db } from "../server.js";

export function adminLogin(req, res){
    const {email, password } = req.body;
  
    // Input check
    if (!email || !password){
      console.log(`invalid login input.`)
      return res.json(`invalid input`);
    }
    // Fetch user detail from the database
    db.select('*')
      .from('admin')
      .where({email: email,})       
      .then(data => {
        //
        console.log(data[0])
        if(data.length> 0){
          bcrypt.compare(password, data[0].password, function(err, result) {
            if (err) res.json(new Error('Error decrypting password'));
            const { id } = data[0];
            // JWT Signed token for authentication and protection of server routes.
            const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '1 day'});
            res.cookie("token", token);
            return res.json({status: 'login success', data: {...data[0], password: null}});
        });
          }
      })
      .catch(err => res.json({Status:'Error'}));
  }

//   '/admin/count' controller
export function adminCount(req, res){
    db
    .from('admin')
    .count('id as ID')
    .then(data=> {
      res.json({status: 'success',data: data})
    })
    .catch(err => res.json('Error fetching salary of users'))
  }

//   '/admin/details'
  export function adminDetails(req, res){
    db
    .select('id', 'name', 'email')
    .from('admin')
    .then(data=> {
      res.json({status: 'success',data: data})
    })
    .catch(err => res.json('Error fetching salary of users'))
  }

  
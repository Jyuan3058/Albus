import {Router, type Request, type Response} from 'express';
import express from 'express';
import bcrypt from 'bcrypt';
import pool from '../../db/connection.ts'

const router = Router();

router.post('/api/auth/login', async (req:Request,res:Response) =>{
    const{email,password} = req.body;
    let success = false;
    try{
        const result = await pool.query('SELECT passhash FROM users WHERE email = $1', [email]);
        success = await bcrypt.compare(password,result.rows[0]['passhash']);
        // res.status(200).json();
    }
    catch(err:any){
        res.status(500).json({success:false,error:err});
    }
    if (success === true){
        try{
        const result = await pool.query('SELECT firstname,lastname FROM users WHERE email = $1', [email]);
        res.status(200).json(result.rows[0]);
        }
        catch(err:any){
            res.status(500).json(err);
        }
    }
    else{
        res.status(500).json({password:'wrong'});
    }
});

export default router;
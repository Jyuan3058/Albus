import {Router, type Request, type Response, } from 'express';
import pool from '../../db/connection.ts';
import bcrypt from 'bcrypt';
import express from 'express';

const router = Router();
router.post('/api/auth/signup', async (req:Request,res:Response)=> {
    const {email,password,firstName,lastName,userTier} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try
    {
        const result = await pool.query('INSERT into users (email,firstname,lastname,passhash) VALUES ($1,$2,$3,$4) RETURNING userid,firstName,lastName,email,passHash',[email,firstName,lastName,hashedPassword]);
        res.status(201).json(result.rows[0]);
    }
    catch(err:any){
        console.error(err);
        res.status(500).json({sucess:false, error:err});
    }
    
});


export default router;
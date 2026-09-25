import {Router, type Request, type Response} from 'express';
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../../db/connection.ts'

const router = Router();

router.post('/api/auth/login', async (req:Request,res:Response) =>{
    const{email,password} = req.body;
    try
    {
        if (email != null && password != null)
        {
            const result = await pool.query('SELECT userid,passhash FROM users WHERE email = $1', [email]);
            if (result.rows.length > 0)
            {
                const success = await bcrypt.compare(password,result.rows[0]['passhash']);
                if (success === true)
                {
                    try
                    {
                        const jwtToken = jsonwebtoken.sign({ userID:result.rows[0]['userid']}, process.env.JWT_SECRET!, { algorithm: 'HS256'});
                        res.status(200).json({ token: jwtToken });
                    }
                    catch(err:any)
                    {
                        res.status(500).json(err);
                    }
                }
                else
                {
                    return res.status(401).json({error:'Invalid credentials'});
                }
            }// res.status(200).json();
            else
            {
                return res.status(401).json({ error: 'Invalid credentials'});
            }
        }
        else
        {
            return res.status(401).json({ error: "Invalid credentials"});
        }
    }
    catch(err:any)
    {
        res.status(500).json({err});
    }
});

export default router;
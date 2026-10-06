import pool from './connection.ts';
import {Response} from 'express';

// add new stock to portfolio
// need to get userID
async function insertPosition(portfolioID:number,stockIDs:number){
    let query = 'INSERT INTO positions (portfolioid,stockid) VALUES ($1,$2) ON CONFLICT (portfolioid, stockid) DO NOTHING';
    let result = await pool.query(query,[portfolioID,stockIDs]);    
}

export {insertPosition};
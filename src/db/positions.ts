import pool from './connection.ts';
import {Response} from 'express';

// add new stock to portfolio
// need to get userID
async function insertPosition(portfolioID:number,stockIDs:number){
    const query = 'INSERT INTO positions (portfolioid,stockid) VALUES ($1,$2) ON CONFLICT (portfolioid, stockid) DO NOTHING';
    const result = await pool.query(query,[portfolioID,stockIDs]);    
}

async function deletePosition(portfolioID:number,stockID:number){
    const query = 'DELETE FROM positions WHERE portfolioid = $1 AND stockid = $2';
    const result = await pool.query(query,[portfolioID,stockID])
}

export {insertPosition, deletePosition};
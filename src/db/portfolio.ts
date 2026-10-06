import pool from './connection.ts';
import {Response} from 'express';

async function getPortfolioID(userID:number){
    const query = 'SELECT portfolioid FROM userportfolio WHERE userid = $1';
    const result = await pool.query(query,[userID]);
    return result.rows[0].portfolioid;
}

export {getPortfolioID};
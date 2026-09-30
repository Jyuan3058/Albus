import express from 'express';
import {Router,Request,Response} from 'express';
import pool from '../../db/connection.ts';
import getDailyUrl from '../dataCollection/avRequestBuilder.ts';
import getStock from '../dataCollection/stockLookup.ts';
import processStock from '../dataProcessing/processStock.ts';

const router = Router();

// needs to grab the tickers from req
// call my server logic that calls the stock api
// then post to the db
router.post('/holdings/add', async (req:Request,res:Response)=>{
    const tickers = req.body.tickers;
    const tickerData = await getStock(tickers);
    const processedData = processStock(tickerData);
    
    // console.log(tickerData);

    res.status(200).json({data:tickerData});
}); 


export default router;
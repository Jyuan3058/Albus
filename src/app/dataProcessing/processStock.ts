
import {parse} from 'csv-parse';
import fs from 'fs';
import getActiveDate from './getDate.ts';
// for alpha vantage return
function processStock(stockData:any[]){
    const date = getActiveDate();
    console.log(date)    
    
    console.log(stockData);
    
    console.log(stockData[0]["Meta Data"]["2. Symbol"]);
    for (let i = 0; i < stockData.length; i++){
        console.log(stockData[i]["Meta Data"]["2. Symbol"]);
        console.log(stockData[i]["Time Series (Daily)"][date]);
        // i now have the price data for intra day for each ticker that is sent through the body
        // now i need to update the db
    }
}

export default processStock;


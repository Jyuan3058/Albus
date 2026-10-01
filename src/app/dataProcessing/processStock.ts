
import {parse} from 'csv-parse';
import fs from 'fs';
import getActiveDate from './getDate.ts';
import {getStockID, insertStock, insertStockPrice,getStockPriceByDate} from '../../db/stocks.ts'

// for alpha vantage return
async function processStock(stockData:any[]){
    // previous date due to not having current day api access
    const lastCompleteDay = getActiveDate();
    console.log(lastCompleteDay)    

    for (let i = 0; i < stockData.length; i++){

        const symbol = stockData[i]["Meta Data"]["2. Symbol"];
        let stockID = await getStockID(symbol);
        if (!stockID){stockID = await insertStock(symbol);}

        const priceForDate = await getStockPriceByDate(stockID,new Date(lastCompleteDay));
        if (!priceForDate){
            const dataByDate = stockData[i]["Time Series (Daily)"][lastCompleteDay];
            const open = dataByDate["1. open"];
            const close = dataByDate["4. close"];
            const high = dataByDate["2. high"];
            const low = dataByDate["3. low"];
            const volume = dataByDate["5. volume"];
            insertStockPrice(stockID,new Date(lastCompleteDay),Number(open),Number(close),Number(high),Number(low),Number(volume));
        };
    }

    // future plans for backfilling historical data
}

async function processPositions()
export default processStock;


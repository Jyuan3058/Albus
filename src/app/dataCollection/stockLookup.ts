import getDailyUrl from '../dataCollection/avRequestBuilder.ts';
import {Response} from 'express';

const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
async function getStock(tickers:string[]){
    // console.log(tickers);
    if (tickers.length === 0) return [];
    let tickerUrls = getDailyUrl(tickers);
    let tickerData = [];
    for (const url of tickerUrls)
    {
        try
        {
            await sleep(2000);
            const res = await fetch (url,{headers: {'User-Agent': 'request'}});
            const data = await res.json();
            // console.log('lookup', data);
            if (!res.ok) return [res];
            tickerData.push(data);
        }
        catch
        {
            return [];
        }
    }
    // console.log(tickerData);
    return tickerData;
}

export default getStock;
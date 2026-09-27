const key = process.env.AV_KEY;
const baseUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='
const urlKey = `&apikey=${key}`

function getDailyUrl(tickers:string[]){
    // console.log(`get: ${tickers}`);
    if (tickers.length === 0) return [];
    let tickerUrls = []
    for (const tikr of tickers){
        // console.log(tikr);
        let finalUrl = baseUrl + tikr + urlKey;
        tickerUrls.push(finalUrl);
    }
    // console.log(tickerUrls)
    return tickerUrls;
};


export default getDailyUrl;
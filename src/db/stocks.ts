import pool from './connection.ts';

async function getStockID(symbol:string){
    const result = await pool.query('SELECT stockid FROM stocks WHERE ticker = $1', [symbol]);
    return result.rows[0]?.stockid;
};

async function insertStock(symbol:string){
    const query = "INSERT INTO stocks(ticker) VALUES($1) RETURNING stockid"
    const result = await pool.query(query,[symbol]);
    return result.rows[0].stockid;
}

async function insertStockPrice(stockid:number,date:Date,open:number,close:number,high:number,low:number,volume:number){
    const query = "INSERT INTO stockprices(stockid,date,open,close,high,low,volume) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING stockid";
    const result = await pool.query(query,[stockid,date,open,close,high,low,volume]);
    return result.rows[0].stockid;
}

async function getStockPriceByDate(stockid:string,date:Date){
    const query = "SELECT open,close,high,low,volume,date FROM stockprices WHERE stockid = $1 AND date = $2";
    const result = await pool.query(query,[stockid,date]);
    return result.rows[0];
}

export { getStockID, insertStock, insertStockPrice,getStockPriceByDate };
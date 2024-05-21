"use server"
import * as dotenv from 'dotenv'
dotenv.config()
const api_key = process.env.POLYGON_KEY as string
if(!api_key)throw new Error('API key not found')

export type StockData = {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }

export const fetchStockData = async (symbol, interval = 'minute', fromDate, toDate) => {
    const url = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/${interval}/${fromDate}/${toDate}?apiKey=${api_key}`;
    try {
    const response = api_key && await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching stock data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results.map((result) => ({
        time: result.t,
        open: result.o,
        high: result.h,
        low: result.l,
        close: result.c,
        volume: result.v,
      }));
    } catch (error) {
      console.error(error);
      return [];
    }
  };
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import Watchlist from './WatchList';
import Chart from './Chart';
import Graph from './Graph';

require("dotenv").config();

const App = () => {
    const [stockList, setStockList] = useState([]);
        // {
        //     ticker: "AAPL",
        //     company_name: "Apple Inc.",
        //     price: 229.13,
        //     percentage: 13.78
        // },
        // {
        //     ticker: "TSLA",
        //     company_name: "Tesla Inc.",
        //     price: 82.99,
        //     percentage: 47.34
        // },
        // {
        //     ticker: "TWTR",
        //     company_name: "Twitter",
        //     price: 51.47,
        //     percentage: 1.32
        // }
    // ]);
    const [series, setSeries] = useState([]);

    const isInitialMount = useRef(true);

    // initial render
    useEffect(() => {
        // check if initial render
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            onTickerSubmit();
        }
        
        console.log(stockList)
        getStockData();
    }, [])

    // update stockList
    useEffect(() => {
        
    }, [stockList])

    // grab data
    // let data = [];

    // 
    const getStockData = async () => {
        try {
            const data = await axios.get('https://demo-live-data.highcharts.com/aapl-c.json');
            setSeries(data);
        } catch(err) {
            console.log(err);
        }
    }

    // let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&outputsize=compact&apikey=${process.env.REACT_APP_API_KEY_AV}`;
    const onTickerSubmit = async (ticker) => {
        // trim user input
        ticker = ticker.replace(/\s+/g, '');

        // call Alphavantage API


        // add to watchlist

        try {
            const chart_func = "TIME_SERIES_DAILY";
            // let price_now;
            // let percentChange;

            const chart_res = await axios.get(`https://www.alphavantage.co/query?function=${chart_func}`, {
                params: {
                    symbol: ticker,
                    outputsize: "compact",
                    apikey: process.env.REACT_APP_API_KEY_AV
                }
            });
            const values = Object.values(chart_res.data["Time Series (Daily)"]);
            const price_yday = (Math.round((parseFloat(values[1]["4. close"]) + Number.EPSILON) * 100) / 100).toFixed(2);
            const price_now = (Math.round((parseFloat(values[0]["4. close"]) + Number.EPSILON) * 100) / 100).toFixed(2);
            const percentageChange = -((((price_yday - price_now) / price_yday) * 100).toFixed(2));
            // console.log(price_now);
            // const percentageChange = 

            console.log(price_yday); // 115
            console.log(price_now); // 108
            console.log(percentageChange);
            console.log(chart_res);

            const overview_res = await axios.get('https://www.alphavantage.co/query?function=OVERVIEW', {
                params: {
                    symbol: ticker,
                    apikey: process.env.REACT_APP_API_KEY_AV
                }
            });

            console.log(overview_res);

            // let x = [];
            // let y = [];

            // for (let key in chart_res.data["Time Series (1min)"]) {
            //     x.push(key);
            //     y.push(chart_res.data["Time Series (1min)"][key]["1. open"]);
            // }

            console.log("stocklist: " + stockList)

            let updatedList = [...stockList];

            console.log("updatedList: " + updatedList)

            updatedList.push({
                ticker: overview_res.data.Symbol,
                company_name: overview_res.data.Name,
                price: price_now,
                percentage: percentageChange
                // currentPrice: y[0],
                // prevPrice: y[1],
                // chartXVals: [...x],
                // chartYVals: [...y],
            })

            setStockList(updatedList)

            console.log("stocklist: " + stockList)

        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="container">
            <h1 className="title">StockPulse</h1>
            <SearchBar
                onTickerSubmit={onTickerSubmit}
            />
            <Watchlist 
                stockList={stockList}
            />
            {/* <Chart /> */}
            <Chart 
                data={series}
            />
        </div>
        
    );
}

export default App;
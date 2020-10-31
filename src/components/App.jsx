import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import SearchBar from './SearchBar';
import Watchlist from './WatchList';
import Chart from './Chart';

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
        } else { // else, update render
            onTickerSubmit();
        }

        getStockData();
    }, [])

    // update stockList
    useEffect(() => {
        
    }, [stockList])

    const getStockData = async () => {
        try {
            const data = await axios.get('https://demo-live-data.highcharts.com/aapl-c.json');
            setSeries(data);
        } catch(err) {
            console.log(err);
        }
    }

    const handleRemoveStock = (ticker) => {
        console.log(ticker)
        setStockList(stockList.filter(stock => stock.ticker !== ticker))
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
            let values = Object.values(chart_res.data["Time Series (Daily)"]);
            const keys = Object.keys(chart_res.data["Time Series (Daily)"]);
            const price_yday = (Math.round((parseFloat(values[1]["4. close"]) + Number.EPSILON) * 100) / 100).toFixed(2);
            const price_now = (Math.round((parseFloat(values[0]["4. close"]) + Number.EPSILON) * 100) / 100).toFixed(2);
            const change = (Math.round((price_now - price_yday) * 100 / 100)).toFixed(2);
            const percentageChange = -((((price_yday - price_now) / price_yday) * 100).toFixed(2));
            // console.log(price_now);
            // const percentageChange = 

            values = values.map((val) => ({
                open: parseFloat(val["1. open"]),
                high: parseFloat(val["2. high"]),
                low: parseFloat(val["3. low"]),
                close: parseFloat(val["4. close"]),
                volume: parseFloat(val["5. volume"])
            }));
            // console.log(values);
            // console.log(keys);
            let pairs = []
            for (let i = 0; i < values.length; ++i) {
                pairs.push({
                    "date": keys[i],
                    ...values[i]
                })
            }
            let chart = pairs.map(pair => [Date.parse(pair.date), pair.close]);
            console.log(chart);
            // console.log([Date.parse(day.date), day.close])
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
                symbol: overview_res.data.Symbol,
                color: 'red',
                display: true,
                name: overview_res.data.Name,
                price: price_now,
                change: change,
                changePercent: percentageChange,
                data: chart
            })

            setStockList(
                ...stockList,
                updatedList
            )

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
            {stockList.length > 0 
            ? (
                <Watchlist 
                    stockList={stockList}
                    handleRemoveStock={handleRemoveStock}
                />
            )
            : <div className="WatchList"></div>
            }
            {/* <Chart /> */}
            <Chart 
                series={stockList}
            />
        </div>
        
    );
}

export default App;
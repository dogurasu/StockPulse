import React from 'react';
import axios from 'axios';
// import Stock1 from './components/Stock1';
// import Watchlist from './components/Watchlist';

import './App.css';
require("dotenv").config();

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockList: [],
        }
    }

    componentDidMount() {
        this.onTickerSubmit('AAPL');
    }


        // let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&outputsize=compact&apikey=${process.env.REACT_APP_API_KEY_AV}`;
    onTickerSubmit = async (ticker) => {
        try {
            const chart_func = "TIME_SERIES_INTRADAY";

            const chart_res = await axios.get(`https://www.alphavantage.co/query?function=${chart_func}`, {
                params: {
                    symbol: ticker,
                    interval: "1min",
                    outputsize: "compact",
                    apikey: process.env.REACT_APP_API_KEY_AV
                }
            });

            console.log(chart_res);

            const overview_res = await axios.get('https://www.alphavantage.co/query?function=OVERVIEW', {
                params: {
                    symbol: ticker,
                    apikey: process.env.REACT_APP_API_KEY_AV
                }
            });

            console.log(overview_res);

            let x = [];
            let y = [];

            for (let key in chart_res.data["Time Series (1min)"]) {
                x.push(key);
                y.push(chart_res.data["Time Series (1min)"][key]["1. open"]);
            }

            let updatedList = [...this.state.stockList];

            updatedList.push({
                ticker: overview_res.data.Symbol,
                name: overview_res.data.Name,
                currentPrice: y[0],
                prevPrice: y[1],
                chartXVals: [...x],
                chartYVals: [...y],
            })

            this.setState({
                stockList: [...updatedList]
            })

            console.log(this.state.stockList)

        } catch(err) {
            console.log(err);
        }
    };

    render() {
        return (
            <div className="App ui container grid" style={{marginTop: "4rem"}}>
                {/* essentially React.createElement(Stock, {ticker: 'AAPL', null}) */}
                {/* <Watchlist className="six wide column" onTickerSubmit={onTickerSubmit}/> */}
                {/* <Stock1 className="ten wide column"/> */}
            </div>
        );
    }
}

export default App;
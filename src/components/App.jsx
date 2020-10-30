import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid } from 'semantic-ui-react';

import SearchBar from './SearchBar';
import Watchlist from './Watchlist';
import Chart from './Chart';

import './App.css';
require("dotenv").config();

const App = () => {

    // initial render
    useEffect(() => {
        onTickerSubmit('AAPL');
    }, [])


    // let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&outputsize=compact&apikey=${process.env.REACT_APP_API_KEY_AV}`;
    const onTickerSubmit = async (ticker) => {
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

    return (
        <Container style={{marginTop: "2rem"}}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <h1>StockPulse</h1>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <SearchBar onTickerSubmit={onTickerSubmit} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Watchlist />
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Chart />
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        </Container>
    );
}

export default App;
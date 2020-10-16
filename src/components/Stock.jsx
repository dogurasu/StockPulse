import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';
// import axios from '../apis/alphavantage';

const Stock = (props) => {
    const [chartXVals, setChartXVals] = useState([]);
    const [chartYVals, setChartYVals] = useState([]);
    const [ticker, setTicker] = useState('');

    useEffect(() => {
        // let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=FB&outputsize=compact&apikey=${process.env.REACT_APP_API_KEY_AV}`;

        try {
            const getCoordinates = async () => {
                const func = "TIME_SERIES_INTRADAY";
                const res = await axios.get(`https://www.alphavantage.co/query?function=${func}`, {
                    params: {
                        symbol: "FB",
                        interval: "1min",
                        outputsize: "compact",
                        apikey: process.env.REACT_APP_API_KEY_AV
                    }
                });
                console.log(res);
    
                let x = [];
                let y = [];
    
                for (let key in res.data["Time Series (1min)"]) {
                    x.push(key);
                    y.push(res.data["Time Series (1min)"][key]["1. open"]);
                }
    
                // console.log(x.length);
                // console.log(y.length);
    
                setChartXVals(x);
                setChartYVals(y);
            }
    
            // console.log("API KEY: " + process.env.REACT_APP_API_KEY_AV)
            
            getCoordinates();

        } catch(err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <h1>Stock Market</h1>
            {/* <p>x-values: {this.state.stockChartXValues}</p>
            <p>y-values: {this.state.stockChartYValues}</p> */}
            <Plot
                data={[
                    {
                        x: chartXVals,
                        y: chartYVals,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: {color: 'red'},
                    },
                ]}
                layout={{
                    width: 720,
                    height: 420,
                    title: "A Fancy Plot",
                    xaxis: {
                        title: "Date"
                    },
                    yaxis: {
                        title: "Price"
                    }
                }}
            />
            <input type="text" id="ticker_input"/>
            
            {/* <button onClick={this.changeStateString.bind(this)} style={{padding: "1rem", fontSize: "24px", fontWeight: "500"}}>Change State!</button> */}
            {/* style={{width: "100px", height: "100px"}} */}
        </div>
    );
}

export default Stock;
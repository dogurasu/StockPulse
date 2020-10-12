import React from 'react';
import Plot from 'react-plotly.js';

const path = require('path');
// console.log(path.isAbsolute(path.join(__dirname, 'apis')));
console.log(path.join(__dirname, ''));

class Stock extends React.Component {
    // constructor to store our state
    constructor(props) {
        super(props);
        this.state = {
            stockChartXVals: [],
            stockChartYVals: []
        }
    }
    
    fetchStock = () => {
        const pointerToThis = this;
        console.log(pointerToThis);
        const API_KEY_AV = process.env.API_KEY;
        let api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=FB&outputsize=compact&apikey=${API_KEY_AV}`;
        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        fetch(api_call)
            .then((res, rej) => {
                return res.json();
            })
            .then((json) => {
                console.log(json);

                for (let key in json["Time Series (Daily)"]) {
                    stockChartXValuesFunction.push(key);
                    stockChartYValuesFunction.push(json["Time Series (Daily)"][key]["1. open"]);
                }

                // console.log(stockChartXValuesFunction);
                pointerToThis.setState({
                    stockChartXVals: stockChartXValuesFunction,
                    stockChartYVals: stockChartYValuesFunction,
                })
            })
    }

    componentDidMount = () => {
        this.fetchStock();
    }

    

    render() {
        return (
            <div>
                <h1>Stock Market</h1>
                {/* <p>x-values: {this.state.stockChartXValues}</p>
                <p>y-values: {this.state.stockChartYValues}</p> */}
                <Plot
                    data={[
                        {
                            x: this.state.stockChartXVals,
                            y: this.state.stockChartYVals,
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
            </div>
        )
    }
}

export default Stock;
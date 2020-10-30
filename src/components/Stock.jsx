import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Stock = ({ ticker, name, currentPrice, prevPrice, chartXvals, chartYvals}) => {

    return (
        <div>
            <h1>StockSim</h1>
            {/* <p>x-values: {this.state.stockChartXValues}</p>
            <p>y-values: {this.state.stockChartYValues}</p> */}
            <Plot
                data={[
                    {
                        // x: chartXVals,
                        // y: chartYVals,
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
        </div>
    );

    // useEffect update ticker, name, currentPrice, prevPrice
    // useEffect for initial render
    // useEffect(() => {
    //     setTicker(ticker);
    //     setName(name);

    // }, []);
    // }, [ticker, name, currentPrice, prevPrice]);
    

    // return (
    //     <div className="stock__container">
            
    //         <button class="ui icon button "> {/* inverted segment */}
    //             <i class="blue plus circle icon"></i> {/* inverted */}
    //         </button>
    //     </div>

    // )
}


export default Stock;
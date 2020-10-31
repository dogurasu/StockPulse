import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import axios from 'axios';


const Chart = ({ series }) => {
    
    
    const createChart = () => {
        
        const config = {
            rangeSelector: {
                selected: 1,
                enabled: false
            },
            title: {
                text: "Apple Stock Price"
            },
            series: [{
                name: "AAPL",
                series: series.series,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        };

        const chart = Highcharts.stockChart('Chart', {
            ...config,
            series
        });
    }

    // initial render
    useEffect(() => {
        console.log(series);
        createChart();
    }, [])

    // re-renders whenever we receive a new series
    useEffect(() => {
        console.log(series);
        createChart();
    }, [series])
    
    return (
        <div id="Chart" />
    )
}

export default Chart;
import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import axios from 'axios';


const Chart = ({ data }) => {
    
    
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
                data: data.data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        };

        const chart = Highcharts.stockChart('Chart', {
            ...config,
            data
        });
    }

    // initial render
    useEffect(() => {
        console.log(data);
        createChart();
    }, [])

    // re-renders whenever we receive a new series
    useEffect(() => {
        console.log(data);
        createChart();
    }, [data])
    
    return (
        <div id="Chart" />
    )
}

export default Chart;
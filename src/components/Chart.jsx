import React, { useEffect } from 'react';
import Highcharts from 'highcharts/highstock';

const Chart = ({ series }) => {
    const createChart = () => {
        
        const config = {
            rangeSelector: {
                selected: 3,
                enabled: false
            },
            title: {
                // text: "Apple Stock Price"
            },
            series: [{
                // name: "AAPL",
                series: series.series,
                showInNavigator: false,
                tooltip: {
                    valueDecimals: 2
                }
            }],
            xAxis: {

            },
            yAxis: {
                labels: {
                    format: '$ {value}'
                }
            },
            scrollbar: {
                enabled: false
            },
            navigator: {
                enabled: false
            }
        };

        const chart = Highcharts.stockChart('Chart', {
            ...config,
            series
        });
    }

    // initial render
    useEffect(() => {
        createChart();
    }, [])

    // re-renders whenever we receive a new series
    useEffect(() => {
        createChart();
    }, [series])
    
    return (
        <div id="Chart" />
    )
}

export default Chart;
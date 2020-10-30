import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const Chart = () => {
    const config = {
        title: {
            text: 'My chart'
        },
        series: [{
            data: [1, 2, 3]
        }]
    }
    
    return (
        <div style={{width: "500px", height: "500px", backgroundColor: "red"}}>
            <HighchartsReact
                highcharts={Highcharts}
                options={config}
            />
        </div>
    )
}

export default Chart;
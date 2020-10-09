import React from 'react';
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

    componentDidMount = () => {
        // this.fetchStock();
    }

    // fetchStock = () => {
    //     const API_KEY
    // }

    render() {
        return (
            <div>
                <h1>Stock</h1>
            </div>
        )
    }
}

export default Stock;
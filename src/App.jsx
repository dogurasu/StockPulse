import React from 'react';
import Stock from './components/Stock';
import './App.css';
require("dotenv").config();

const App = () => {
    return (
        <div className="App">
            {/* essentially React.createElement(Stock, {ticker: 'AAPL', null}) */}
            <Stock />
        </div>
    );
}

export default App;
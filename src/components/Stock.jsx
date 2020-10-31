import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Stock = ({ stock }) => {

    return (
        <li className="stock">
            <div className="stock__row--top">
                <span className="stock__ticker">{stock.ticker}</span>
                <span className="stock__company_name">{stock.company_name}</span>
            </div>
            <div className="stock__row--bottom">
                <span className="stock__price">{stock.price}</span>
                <span className="stock__percentage">{stock.percentage}</span>
            </div>
        </li>
    );
}


export default Stock;
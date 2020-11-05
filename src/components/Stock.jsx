import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Stock = ({ stock, handleRemoveStock }) => {

    const onRemoveStock = () => {
        handleRemoveStock(stock.symbol);
    }
    
    const mouseOverHandle = () => {

    }

    const renderToggles = () => {
        return (
            <div className="Stock__toggle">
                <span 
                    className="Stock__toggle--remove"
                    onClick={handleRemoveStock}
                ></span>
            </div>
        )
    };

    return (
        <li className="Stock">
            <div className="Stock__icon">
                <HighlightOffIcon
                    fontSize="large"
                    style={{color: "red"}}
                    className="Stock__icon-remove"
                    onClick={onRemoveStock}
                />
            </div>
            <div className="Stock__container">
                <div className="Stock__row--top">
                    <span className="Stock__ticker">{stock.symbol}</span>
                    <span className="Stock__price">${stock.price}</span>
                </div>
                <div className="Stock__row--bottom">
                    <span className="Stock__company_name">{stock.name}</span>
                    <span className="Stock__percentage">{stock.changePercent}%</span>
                </div>
            </div>
        </li>
    );
}


export default Stock;
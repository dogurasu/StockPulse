import React, { useState, useEffect } from 'react';
import Stock from './Stock';

const Watchlist = () => {
    const [stocks, setStocks] = useState([]);

    // update watchlist
    useEffect(() => {

    }, []);

    // const renderedWatchlist = 


    return (
        <div className="watchlist__container">
            <h1>Watchlist</h1>
            <div className="watchlist__stocks">
                
            </div>
        </div>
    )
}

export default Watchlist;
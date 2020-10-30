import React, { useState, useEffect } from 'react';

const SearchBar = ({ onTickerSubmit }) => {
    const [ticker, setTicker] = useState('');

    // update 'ticker' property
    const onInputChange = (e) => {
        setTicker(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        onTickerSubmit(ticker); // callback to App
    }

    return (
        <div className="search-bar">
            <form onSubmit={onFormSubmit} className="ui form">
                <div className="field">
                    <input
                        style={{padding: "1rem", fontSize: "1.2rem"}}
                        placeholder="Type a ticker in..."
                        type="text"
                        value={ticker}
                        onChange={onInputChange}
                    />
                </div>
            </form>
        </div>
    )

}

export default SearchBar;
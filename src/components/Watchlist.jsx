import React, { useState, useEffect } from 'react';
import Stock from './Stock';
import { Menu, Label } from 'semantic-ui-react';

const Watchlist = ({ stockList, handleRemoveStock }) => {
    const [activeItem, setActiveItem] = useState('');

    const colors = [
        {
            'name': 'stockName1',
            'color': 'red',
        }, 
        {
            'name': 'stockName2',
            'color': 'blue'
        },
    ]

    // update watchlist
    useEffect(() => {
        
    }, []);

    const handleSelectStock = (e, { name } ) => {
        setActiveItem(name);
    }


    return (
        <div className="WatchList">
            <ul className="WatchList__list">
                {stockList.map((stock) => (
                    <Stock
                        key={stock.symbol}
                        onClick={handleRemoveStock}
                        stock={stock}
                        handleRemoveStock={handleRemoveStock}
                    />
                ))}
            </ul>
            {/* <Menu 
                fluid
                vertical
                size='massive'
            >
                {colors.map((c) => (
                    <Menu.Item
                        name={c.name}
                        active={activeItem === c.name}
                        color={c.color}
                        onClick={handleSelectStock}
                    >
                        <Label color='teal'>
                            $300.21 (+21%)
                        </Label>
                        AAPL
                    </Menu.Item>
                ))}
                <Menu.Item
                    name="stockName2"
                    active={activeItem === "stockName2"}
                    onClick={handleSelectStock}
                >
                    <Label color='teal'>
                        $300.21
                    </Label>
                    AAPL
                </Menu.Item>
            </Menu> */}
        </div>
    )
}

export default Watchlist;
import React, { useState, useEffect } from 'react';
import Stock from './Stock';
import { Menu, Label } from 'semantic-ui-react';

const Watchlist = () => {
    const [activeItem, setActiveItem] = useState('');


    // update watchlist
    useEffect(() => {

    }, []);

    // const renderedWatchlist = 

    const handleSelectStock = (e, { name } ) => {
        setActiveItem(name);
    }


    return (
        <Menu vertical>
            <Menu.Item
                name="stockName1"
                active={activeItem === "stockName1"}
                onClick={handleSelectStock}
            >
                <Label color='teal'>
                    <p>$300.21</p>
                    <p>50.12%</p>
                </Label>
                AAPL
            </Menu.Item>
            <Menu.Item
                name="stockNam2"
                active={activeItem === "stockName2"}
                onClick={handleSelectStock}
            >
                <Label color='teal'>
                    <p>$300.21</p>
                    <p>50.12%</p>
                </Label>
                AAPL
            </Menu.Item>
        </Menu>
    )
}

export default Watchlist;
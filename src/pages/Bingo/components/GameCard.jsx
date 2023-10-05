import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import GameNumber from './GameNumber';

const GameCard = ({ data, callback, code }) => {
    const token = data?.playcard_token;
    const card = data?.card;

    const [reloadKey, setReloadKey] = useState(0);
    const key = useRef(0);

    const handleNewCardClick = (e) => {
        e.preventDefault();

        const apiUrl = "http://www.hyeumine.com/getcard.php?bcode=";

        axios.get(apiUrl + code)
            .then(response => {
                if (response.data) {
                    callback(response.data);
                    setReloadKey(reloadKey + 1);
                }
            })
            .catch(error => {
                alert("invalid game code!");
            });
    }

    const handleCheckCardClick = (e) => {
        e.preventDefault();

        const apiUrl = "http://www.hyeumine.com/checkwin.php?playcard_token=";

        axios.get(apiUrl + token)
            .then(response => {
                if (response.data) alert("Bingo!");
                else alert("No bingo :(");
            })
            .catch(error => {
                alert("invalid game code!");
            });
    }

    return (
        <div key={reloadKey} className='container-vertical'>
            <h1>{"Game Code: " + code}</h1>
            <div className='game-card container'>
                <div className="container-vertical">
                    <h1>B</h1>
                    {card?.B.map((num) => (<GameNumber key={key.current++} number={num} />))}
                </div>
                <div className="container-vertical">
                    <h1>I</h1>
                    {card?.I.map((num) => (<GameNumber key={key.current++} number={num} />))}
                </div>
                <div className="container-vertical">
                    <h1>N</h1>
                    {card?.N.map((num) => (<GameNumber key={key.current++} number={num} />))}
                </div>
                <div className="container-vertical">
                    <h1>G</h1>
                    {card?.G.map((num) => (<GameNumber key={key.current++} number={num} />))}
                </div>
                <div className="container-vertical">
                    <h1>O</h1>
                    {card?.O.map((num) => (<GameNumber key={key.current++} number={num} />))}
                </div>
            </div>
            <div className='container btn-container'>
                <Button
                    className='game-card-btn'
                    variant="outlined"
                    color="success"
                    onClick={handleCheckCardClick}
                >Check Card</Button>
                <Button
                    className='game-card-btn'
                    variant="contained"
                    onClick={handleNewCardClick}
                >New Card</Button>
            </div>

        </div>
    );
}

export default GameCard;
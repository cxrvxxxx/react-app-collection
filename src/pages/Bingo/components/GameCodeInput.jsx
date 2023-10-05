import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import styles from '../Bingo.module.css';

export const GameCodeInput = ({ callback, codeCallback }) => {
    const [value, setValue] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (value === '') return;

        const apiUrl = "http://www.hyeumine.com/getcard.php?bcode=";

        axios.get(apiUrl + value)
            .then(response => {
                if (response.data) {
                    callback(response.data);
                    codeCallback(value);
                }
            })
            .catch(error => {
                alert("invalid game code!");
            });
    };

    useEffect(() => {
        setDisabled(value === '' ? true : false);
    }, [value]);

    return (
        <div className={`${styles.containerVertical}`}>
            <label className={`${styles.formLabel}`} htmlFor="game-code">Enter game code</label>
            <input
                className={`${styles.textfield}`}
                label="Enter game code:"
                type="text"
                id="game-code"
                value={value}
                onChange={handleChange} />
            <Button
                className={`${styles.formButton}`}
                variant="contained"
                color="success"
                size="medium"
                onClick={handleClick}
                disabled={disabled}>Join</Button>
        </div>
    );
};

export default GameCodeInput;
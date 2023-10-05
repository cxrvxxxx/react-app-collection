import React, { useState } from 'react';
import styles from '../Bingo.module.css';

const GameNumber = ({ number }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div className={`${styles.container} ${styles.gameNumber} ${clicked ? styles.clicked : ''}`} onClick={() => { setClicked(!clicked); }}>
            {number}
        </div>
    );
};

export default GameNumber;
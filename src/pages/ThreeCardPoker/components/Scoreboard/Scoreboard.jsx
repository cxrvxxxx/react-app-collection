import React, { useContext } from 'react';
import CardContext from '../../contexts/CardContext';
import styles from './Scoreboard.module.css';

const Scoreboard = () => {
    const { score } = useContext(CardContext);

    return (
        <div className={`${styles.scoreboard}`}>
            <PlayerScore number={1} score={score.playerOne} leading={score.playerOne > score.playerTwo} />
            <PlayerScore number={2} score={score.playerTwo} leading={score.playerOne < score.playerTwo} />
        </div>
    );
}

const PlayerScore = ({ number, score, leading }) => {
    return (
        <div className={`${styles.score}`}>
            <h4>Player {number}</h4>
            <h1 className={`${styles['score-value']} ${leading ? styles.leading : ''}`}>{score}</h1>
        </div>
    );
}

export default Scoreboard;
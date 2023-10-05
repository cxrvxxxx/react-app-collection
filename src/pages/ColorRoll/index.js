import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './ColorRoll.module.css';

const getNumber = () => {
  return Math.floor(Math.random() * 8);
}

const App = () => {
  const [score, setScore] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);

  const [isRolling, setIsRolling] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [highlighted, setHighlighted] = useState(null);

  const colors = [
    "red",
    "green",
    "blue",
    "cyan",
    "magenta",
    "yellow",
    "violet",
    "purple",
    "lime"
  ]

  const grid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]

  const gridColors = [
    ["red", "green", "blue"],
    ["cyan", "magenta", "yellow"],
    ["violet", "purple", "lime"]
  ]

  const toggleRoll = () => {
    setIsRolling(!isRolling);
  }

  useEffect(() => {
    if (isRolling) {
      let timer = setInterval(() => {
        setHighlighted(getNumber());
      }, 100)
      setTimerId(timer);
    } else {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }

      if (highlighted !== null) {
        let newScore = [...score];
        newScore[highlighted] += 1;

        setScore(newScore);
      }
    }
  }, [isRolling]);

  // useEffect(() => {
  //   console.log(highlighted);
  // }, [highlighted]);

  useEffect(() => {
    console.log(score);
  }, [score]);

  return (
    <div className={`${styles.ColorRoll}`}>
      <div className={`${styles.scoreboard}`}>
        {colors.map((value, index) => (
          <div className={`${styles.swatch} ${styles[colors[index]]}`}>{score[index]}</div>
        ))}
      </div>
      <div className={`${styles.gallery}`}>
        {grid.map((row, rowIndex) => (
          <div className={`${styles.row}`}>
            {row.map((cell, cellIndex) => (
              <div className={`${styles.button} ${((highlighted === cell) ? styles.highlighted : styles[gridColors[rowIndex][cellIndex]])}`}></div>
            ))}
          </div>
        ))}
      </div>
      <div className={`${styles['button-container']}`}>
        <Button
          variant="contained"
          color={isRolling ? "error" : "success"}
          size="large"
          onClick={toggleRoll}>
          {isRolling ? "Stop Rolling" : "Start Rolling"}
        </Button>
      </div>
    </div>
  );
}

export default App;
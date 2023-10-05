import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Singer.module.css';

function App() {
  const key = useRef(0);

  const [singers, setSingers] = useState([
    {
      "id": 1,
      "color": "red"
    },
    {
      "id": 2,
      "color": "orange"
    },
    {
      "id": 3,
      "color": "yellow"
    },
    {
      "id": 4,
      "color": "blue"
    }
  ]);

  const [phrase, setPhrase] = useState("");
  const [lyrics, setLyrics] = useState([]);

  const { id } = useParams();

  const handleChange = (e) => {
    e.preventDefault();
    setPhrase(e.target.value);
  }

  useEffect(() => {
    setPhrase("");
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const updatedLyrics = [...lyrics];

    if (updatedLyrics.length > 0) {
      if (updatedLyrics[updatedLyrics.length - 1].singer.id == id) {
        if (phrase === '') updatedLyrics.pop();
        else updatedLyrics[updatedLyrics.length - 1].value = phrase;
      } else {
        if (phrase !== '')
          updatedLyrics.push({
            "singer": singers[id - 1],
            "value": phrase
          });
      }
    } else {
      if (phrase !== '')
        updatedLyrics.push({
          "singer": singers[id - 1],
          "value": phrase
        });
    }

    setLyrics(updatedLyrics);
  }, [phrase]);

  return (
    <div className={`${styles.App}`}>
      <div className={`${styles.selection}`}>
        {singers.map((singer) => (
          <Link key={key.current++} to={`/singers/${singer.id}`}>
            <div
              key={key.current++}
              className={`${styles.button} ${styles[singer.color]}`}
            >{"Singer " + singer?.id}</div>
          </Link>
        ))}
      </div>
      <div className={`${styles['form-container']} ${!id ? styles.hidden : ''}`}>
        <input
          type="text"
          value={phrase}
          className={`${styles['input-lyrics']}`}
          id="input-lyrics"
          placeholder="Start typing..."
          onChange={handleChange}
          disabled={!id}
        />
      </div>
      <div className={`${styles['lyrics-container']}`}>
        <div className={`${styles.lyrics}`}>
          {lyrics.map((lyric) => (
            <div key={key.current++} className={`${styles.phrase} ${styles[lyric.singer.color]}`}>{lyric.value}</div>
          ))}
        </div>
      </div>
    </div >
  );
}

export default App;

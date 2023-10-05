import React, { useContext, useRef } from "react";
import CardContext from "../../contexts/CardContext";
import styles from './Gallery.module.css';
import GalleryItem from "./GalleryItem";

export const getCardImage = ({ suit, value }) => {
  let path = "/images/cards/";

  switch (value) {
    case 14:
      path += "ace_of_";
      break;
    case 11:
      path += "jack_of_";
      break;
    case 12:
      path += "queen_of_";
      break;
    case 13:
      path += "king_of_";
      break;
    default:
      path += value + "_of_";
  }

  switch (suit) {
    case 1:
      path += "clubs.png";
      break;
    case 2:
      path += "diamonds.png";
      break;
    case 3:
      path += "hearts.png";
      break;
    case 4:
      path += "spades.png";
      break;
    default:
  }

  return path;
}

const Gallery = () => {
  const key = useRef(0);
  const { activeCards: cards, winPlayer: winner } = useContext(CardContext);

  return (
    <div className={`${styles.gallery}`}>
      <div className={`${styles['card-container']} ${winner === 1 ? styles.winner : ''}`}>
        {cards?.playerOne.map((card) => (
          <GalleryItem key={key.current++} value={card} />
        ))}
      </div>
      <div className={`${styles['card-container']} ${winner === 2 ? styles.winner : ''}`}>
        {cards?.playerTwo.map((card) => (
          <GalleryItem key={key.current++} value={card} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
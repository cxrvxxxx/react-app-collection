import React, { useState } from 'react';
import './Bingo.css';
import GameCard from './components/GameCard';
import GameCodeInput from './components/GameCodeInput';

/* REST Calls for Bingo

BINGO Url GameBoard: http://www.hyeumine.com/bingodashboard.php?bcode=HEelhJos
HEelhJos is the GameCode

Get Card URL: http://www.hyeumine.com/getcard.php?bcode=HEelhJos
Parameter: bcode = Bingo Game Code
Return: 0 if Game Code not Found
JSON Encoded shown below.

Check Card Win: http://www.hyeumine.com/checkwin.php?playcard_token=vxhwG7TPiAMqwxd2
Parameter: playcard_token= Playcard_token returned when asking requesting a Bingo Card.
Return: 0 if Playcard_token not Found, Or Not a Winning Card
1 if Winning Card

Take a look at these URLs.
An activity will be posted. Summary of the App:
- Create a BINGO Card App
- Data for the Card is from the URLs above.
- A Player can join and check to a Game.

*/

const Bingo = () => {
  const [cards, setCards] = useState(null);
  const [gameCode, setGameCode] = useState('');

  return (
    <div className="Bingo">
      <div className='container'>
        {cards === null ? <GameCodeInput callback={setCards} codeCallback={setGameCode} /> : <GameCard data={cards} callback={setCards} code={gameCode} />}
      </div>
    </div>
  );
}

export default Bingo;

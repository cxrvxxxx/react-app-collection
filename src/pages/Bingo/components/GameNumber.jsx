import React, { useState } from 'react';

const GameNumber = ({ number }) => {
    const [clicked, setClicked] = useState(false);

    return (
        <div className={"container game-number" + (clicked ? " clicked" : "")} onClick={() => { setClicked(!clicked); }}>
            {number}
        </div>
    );
};

export default GameNumber;
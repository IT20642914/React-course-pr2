import React from 'react'

const GameOver = ({winner,resetGame}) => {
  return (
    <div id='game-over'>
        <h2>Game Over</h2>
        {winner&&<p>{winner} wins</p>}
        {!winner&&<p>It&apos;s a draw</p>}
<p>
    <button onClick={resetGame}>Rematch !</button>
</p>
    </div>
  )
}

export default GameOver
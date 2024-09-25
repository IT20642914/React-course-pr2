import Player from "./components/player/player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
function App() {
  const [activePlayer, setActivePlayer] = useState('X');

  const handleSelectSquare=()=>{
    setActivePlayer(prev=>prev==='X'?'O':'X');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer==="X"} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer==="O"} initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare} />
      </div>
    </main>
  );
}

export default App;

import Player from "./components/player/player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";
function App() {
  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);

  const handleSelectSquare=(rowIndex,colIndex)=>{
    setActivePlayer(curActivePlayer=>curActivePlayer==='X'?'O':'X');
    setGameTurns((prevTurns)=>{
      let currantPlayer = "X";
      if(prevTurns.length>0  && prevTurns[0].player === "X"){
        currantPlayer = "O";
      }
      const updatedTurns = [{square:{row:rowIndex,col:colIndex},player:currantPlayer},...prevTurns];
      return updatedTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer==="X"} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer==="O"} initialName="Player 2" symbol="O" />
        </ol>
        <GameBoard gameTurns={gameTurns}  onSelectSquare={handleSelectSquare} />
      </div>
    </main>
  );
}

export default App;

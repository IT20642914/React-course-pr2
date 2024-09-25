import Player from "./components/player/player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";

const derivActivePlayer = (gameTurns) => {
  let currantPlayer = "X";
  if(gameTurns.length>0  && gameTurns[0].player === "X"){
    currantPlayer = "O";
  }
  return currantPlayer;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivActivePlayer(gameTurns);
 
  const handleSelectSquare=(rowIndex,colIndex)=>{
    
    setGameTurns((prevTurns)=>{
      const currantPlayer = derivActivePlayer(prevTurns);
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
      <Log gameTurns={gameTurns}/>
    </main>
  );
}

export default App;

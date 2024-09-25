import Player from "./components/player/player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import GameOver from "./components/GameOver/GameOver";
const derivActivePlayer = (gameTurns) => {
  let currantPlayer = "X";
  if(gameTurns.length>0  && gameTurns[0].player === "X"){
    currantPlayer = "O";
  }
  return currantPlayer;
}
const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivActivePlayer(gameTurns);

  // const [hasWinner, setHasWinner] = useState(false);
  let gameWinner = null;
  let gameBoard = [...initialGameBoard.map((row)=>[...row])];
  for(const turn of gameTurns){
      const {square,player}=turn
      const {row,col}=square
      gameBoard[row][col]=player;
  }
 for(const combinations of WINNING_COMBINATIONS){
  const firstSymbol=gameBoard[combinations[0].row][combinations[0].column];
  const SecondSymbol=gameBoard[combinations[1].row][combinations[1].column];
  const thirdSymbol=gameBoard[combinations[2].row][combinations[2].column];

  if(firstSymbol && firstSymbol===SecondSymbol && firstSymbol===thirdSymbol){
    console.log(`${firstSymbol} wins`);
    gameWinner=firstSymbol;
  }
 }

 const hasDraw = gameTurns.length === 9 && !gameWinner;

  const handleSelectSquare=(rowIndex,colIndex)=>{
    
    setGameTurns((prevTurns)=>{
      const currantPlayer = derivActivePlayer(prevTurns);
      const updatedTurns = [{square:{row:rowIndex,col:colIndex},player:currantPlayer},...prevTurns];
      return updatedTurns;
    });
  }

  const resetGame = () => {
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer==="X"} initialName="Player 1" symbol="X" />
          <Player isActive={activePlayer==="O"} initialName="Player 2" symbol="O" />
        </ol>
        {(gameWinner||hasDraw) && <GameOver winner={gameWinner} resetGame={resetGame}/>}
        <GameBoard  board={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log gameTurns={gameTurns}/>
    </main>
  );
}

export default App;

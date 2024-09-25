import Player from "./components/player/player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";
import { WINNING_COMBINATIONS } from "./WINNING_COMBINATIONS";
import GameOver from "./components/GameOver/GameOver";
const Players={
  X:"Player 1",
  O:"Player 2"
}
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

const deriveWinner = (gameBoard,players) => {
  
 for(const combinations of WINNING_COMBINATIONS){
  const firstSymbol=gameBoard[combinations[0].row][combinations[0].column];
  const SecondSymbol=gameBoard[combinations[1].row][combinations[1].column];
  const thirdSymbol=gameBoard[combinations[2].row][combinations[2].column];

  if(firstSymbol && firstSymbol===SecondSymbol && firstSymbol===thirdSymbol){
    return players[firstSymbol];
  }
 }
;
}
const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map((row)=>[...row])];
  for(const turn of gameTurns){
      const {square,player}=turn
      const {row,col}=square
      gameBoard[row][col]=player;
  };
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivActivePlayer(gameTurns);
  const [players, setPlayers] = useState(Players)
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

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
  const handlePlayerNameChange = (symbol,newName) => {
    setPlayers((prevPlayers)=>{
      return {...prevPlayers,[symbol]:newName};
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player isActive={activePlayer==="X"} initialName={Players.X} symbol="X" handlePlayerNameChange={handlePlayerNameChange} />
          <Player isActive={activePlayer==="O"} initialName={Players.O} symbol="O"handlePlayerNameChange={handlePlayerNameChange} />
        </ol>
        {(winner||hasDraw) && <GameOver winner={winner} resetGame={resetGame}/>}
        <GameBoard  board={gameBoard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log gameTurns={gameTurns}/>
    </main>
  );
}

export default App;

import Player from "./Player"
import { useState } from "react";
import GameBoard from "./GameBoard";
import Log from "./Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./GameOver";

const PLAYERS =   {
            "X": "Player 1",
            "O": "Player 2"
            }
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(turns){
  let activePlayer = "X" ;

  if (turns.length > 0 && turns[0].player === "X"){
    activePlayer = "O";
    }
return activePlayer;
}

function deriveWinner(gameBoard, players){
  let winner ;
  for (const combo of WINNING_COMBINATIONS){
    const first = gameBoard[combo[0].row][combo[0].column]
    const second = gameBoard[combo[1].row][combo[1].column]
    const third = gameBoard[combo[2].row][combo[2].column]

    if (first && first === second && first === third){
      winner = players[first];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
      const { square, player } = turn;
      const { row, col } = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns)
  let winner =deriveWinner(gameBoard, players);
  let draw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIdx, colIdx){
      setGameTurns(
        (prevTurns) => {
          let currPlayer = deriveActivePlayer(prevTurns);
          const newTurns = [ 
            {square: {row: rowIdx, col: colIdx }, player : currPlayer},
            ...prevTurns
          ];

          return newTurns;
          }
      )
  }

  function handleRematch(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(
      prevPlayers => {return {  
          ...prevPlayers, 
          [symbol]: newName  
      }
    }
    )
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onNameChange={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onNameChange={handlePlayerNameChange}/>
        </ol>
        {(winner || draw) && <GameOver winner={winner} rematch={handleRematch}/>}
        <GameBoard onSelect={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App

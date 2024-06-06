export default function GameOver({winner, rematch}){
    return (<div id="game-over">
            <h2>Game Over</h2>
            {winner ? <p>{winner} has won!</p> : <p>It's a draw!</p>}
            <button onClick={rematch}>Rematch?</button>
        </div>
        )  
}
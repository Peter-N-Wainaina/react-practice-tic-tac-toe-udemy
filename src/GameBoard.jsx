export default function GameBoard({ onSelect, board }) {


    return (
        <ol id="game-board">
            {board.map(
                (row, rowIdx) =>
                    <li key={rowIdx}>
                        <ol>
                            {row.map(
                                (playerSymbol, colIdx) =>
                                    <li key={colIdx}>
                                <button onClick={() => onSelect(rowIdx, colIdx)} disabled={playerSymbol !== null}>{playerSymbol} </button>
                                    </li>
                            )}
                        </ol>
                    </li>
            )
            }
        </ol>
    )
}
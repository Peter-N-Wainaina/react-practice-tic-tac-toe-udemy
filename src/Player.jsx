import { useState } from "react"

export default function Player ({initialName, symbol}){
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleClick(){
        setIsEditing((editing) => !editing);
    }

    function handleNameChange(event){
        setPlayerName(event.target.value);
    }


    let nameContent = (
        <span className="player-name">{playerName}</span>
    )

    if (isEditing){
        nameContent = (
            <input type="text" required value={playerName} onChange={handleNameChange}></input>
        )
    }

    return (
        <li>
             <span className="player">
                    {nameContent}                
                    <span className="player-symbol">{symbol}</span>
            </span> 
            <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
            
        </li>
    );
}
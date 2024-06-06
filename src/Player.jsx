import { useState } from "react"

export default function Player ({initialName, symbol, isActive, onNameChange}){
    const [playerName, setPlayerName] = useState(initialName)
    const [isEditing, setIsEditing] = useState(false);

    function handleClick(){
        setIsEditing((editing) => !editing);
        if (isEditing){ 
            onNameChange(symbol, playerName);
        }
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
        <li className={isActive? "active" : undefined}>
             <span className="player" >
                    {nameContent}                
                    <span className="player-symbol">{symbol}</span>
            </span> 
            <button onClick={handleClick}>{isEditing?"Save":"Edit"}</button>
            
        </li>
    );
}
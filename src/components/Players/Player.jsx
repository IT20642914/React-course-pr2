import React, { useState } from "react";
const Player = ({ initialName, symbol,isActive,handlePlayerNameChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  const handleEditClick = () => {
    setIsEditing(prev=>!prev);
    if(isEditing){
    handlePlayerNameChange(symbol,playerName);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive?"active":undefined}>
      <span className="player">
        {isEditing ? (
          <input type="text" value={playerName} required onChange={handleNameChange} />
        ) : (
          <span className="player-name">{playerName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "save" : "Edit"}</button>
    </li>
  );
};

export default Player;

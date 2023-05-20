import React from "react";
import playersJSON from "../../data.json";
import { useState } from "react";

function Slider() {
  const players = playersJSON;

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPlayer = players[currentIndex];

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(players.length - 1);
    }
  };
  const next = () => {
    if (currentIndex < players.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        backgroundColor: "#202020",
        color: "#f9f9f9",
      }}
    >
      {players.map((player, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            overflow: "hidden",
            display: currentIndex === index ? "block" : "none",
          }}
        >
          <img
            src={player.playerURL}
            style={{ width: "400px", display: "block" }}
          />
        </div>
      ))}
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      <div>
        <h1>{currentPlayer.id}</h1>
        <h1>{currentPlayer.name}</h1>
        <h2>{currentPlayer.country}</h2>
        <h2>{currentPlayer.birthdate}</h2>
        <h2>{currentPlayer.position}</h2>
        <h2>{currentPlayer.number}</h2>
        {currentPlayer.skills === "" ? null : <h2>{currentPlayer.skills}</h2>}
        <h2>{currentPlayer.height}</h2>
        <h2>{currentPlayer.weight}</h2>
        <img src={currentPlayer.flagURL} />
      </div>
    </div>
  );
}

export default Slider;

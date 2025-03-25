import React, { useState } from "react";
import "./DiceRoller.css"; // Include your CSS file here

const DiceRoller = ({ currentFace, diceRolling }) => {
  return (
    <section className="article__demo">
      <section className="cube-container">
        <div
          id="cube"
          className={`show-${currentFace} ${diceRolling ? "rolling" : ""}`}
        >
          {Array.from({ length: 20 }, (_, i) => (
            <figure key={i} className={`face${String(i + 1).padStart(2, "0")}`}>
              {i + 1}
            </figure>
          ))}
        </div>
      </section>
    </section>
  );
};

export default DiceRoller;

import React from "react";

function Board({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map(({ guess, id }) => {
        return (
          <p key={id} className="guess">
            {guess.map(({ letter, id, status }) => {
              const className = status ? `cell ${status}` : "cell";
              return (
                <span key={id} className={className}>
                  {letter}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export default Board;

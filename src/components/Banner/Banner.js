import React from "react";

function Banner({ gameStatus, guessCount, answer }) {
  if (gameStatus === "playing") return null;

  if (gameStatus === "won") {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{guessCount} guesses</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}

export default Banner;

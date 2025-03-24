import React from "react";

function Form({ addGuess, gameStatus }) {
  const [guess, setGuess] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guess.length !== 5) return;
    addGuess(guess);
    setGuess("");
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        type="text"
        id="guess-input"
        pattern="[A-Za-z]{5}"
        title="5 letter word"
        maxLength={5}
        value={guess}
        onChange={(e) => setGuess(e.target.value.toUpperCase())}
        disabled={gameStatus !== "playing"}
      />
    </form>
  );
}

export default Form;

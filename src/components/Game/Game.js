import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { checkGuess } from "../../game-helpers";

import Form from "../Form/Form";
import Board from "../Board/Board";
import Banner from "../Banner/Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const INITIAL_BOARD_STATE = new Array(NUM_OF_GUESSES_ALLOWED)
  .fill(null)
  .map(() => ({
    guess: new Array(5)
      .fill(null)
      .map(() => ({ letter: "", id: crypto.randomUUID(), status: null })),
    id: crypto.randomUUID(),
  }));

function Game() {
  const [guessCount, setGuessCount] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState("playing");
  const [guesses, setGuesses] = React.useState(INITIAL_BOARD_STATE);

  const addGuess = (guess) => {
    console.info({ guess });

    const guessResult = checkGuess(guess, answer);

    const nextGuesses = [...guesses];
    const nextGuess = nextGuesses[guessCount].guess;

    nextGuess.forEach((item, index) => {
      item.letter = guessResult[index].letter;
      item.status = guessResult[index].status;
    });

    const nextGuessCount = guessCount + 1;
    setGuesses(nextGuesses);
    setGuessCount(nextGuessCount);

    const allGuessesCorrect = guessResult.every(
      ({ status }) => status === "correct"
    );

    if (allGuessesCorrect) {
      setGameStatus("won");
    }

    if (nextGuessCount >= NUM_OF_GUESSES_ALLOWED && !allGuessesCorrect) {
      setGameStatus("lost");
    }
  };

  return (
    <>
      <Board guesses={guesses} />
      <Form addGuess={addGuess} gameStatus={gameStatus} />
      <Banner gameStatus={gameStatus} guessCount={guessCount} answer={answer} />
    </>
  );
}

export default Game;

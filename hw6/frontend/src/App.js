import { useState } from "react";
import { startGame, guess, restart } from "./axios";

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState("");

  const handleGuess = async () => {
    const response = await guess(number);
    if (response === "Equal") setHasWon(true);
    else {
      setStatus(response);
      setNumber("");
    }
  };

  const handleRestart = async () => {
    const response = await restart();
    setStatus(response);
    setHasWon(false);
    setNumber("");
  };

  const handleStart = async () => {
    const response = await startGame();
    setStatus(response);
    setHasStarted(true);
  };

  const startMenu = (
    <div>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );

  const gameMode = (
    <>
      <p>Guess a number between 1 and 100.</p>
      <input
        type="text"
        placeholder="Enter your guess here"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      ></input>
      <button onClick={handleGuess} disabled={!number}>
        guess!
      </button>
      <p>{status}</p>
    </>
  );

  const winningMode = (
    <>
      <p> You won! The number was {number}</p>
      <button // handle restart
        onClick={handleRestart}
      >
        restart
      </button>
    </>
  );

  const game = <div>{hasWon ? winningMode : gameMode}</div>;

  return <div className="App"> {hasStarted ? game : startMenu}</div>;
}

export default App;

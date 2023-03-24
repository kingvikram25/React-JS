import "./App.css";
import { useState } from "react";

// here value is actually "props".
// when you use useState you dont need to use props.

function Squre({ value, onSqureClick }) {
  return (
    <button className="squre" onClick={onSqureClick}>
      {value}
    </button>
  );
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextClick = squares.slice();
    if (xIsNext) {
      nextClick[i] = "X";
    } else {
      nextClick[i] = "O";
    }
    setSquares(nextClick);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner :- " + winner;
  } else {
    status = "NextPlayer :- " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="conatiner">
      <div className="status">{status}</div>
      <div className="board-row">
        <Squre value={squares[0]} onSqureClick={() => handleClick(0)} />
        <Squre value={squares[1]} onSqureClick={() => handleClick(1)} />
        <Squre value={squares[2]} onSqureClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Squre value={squares[3]} onSqureClick={() => handleClick(3)} />
        <Squre value={squares[4]} onSqureClick={() => handleClick(4)} />
        <Squre value={squares[5]} onSqureClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Squre value={squares[6]} onSqureClick={() => handleClick(6)} />
        <Squre value={squares[7]} onSqureClick={() => handleClick(7)} />
        <Squre value={squares[8]} onSqureClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const App = () => {
  return <Board />;
};

export default App;

// to remember things Component use State.

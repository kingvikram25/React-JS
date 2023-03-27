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
// here value and onSqureClick is variable and as well behave like props in board function.

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquarers = squares.slice();
    if (xIsNext) {
      nextSquarers[i] = "X";
    } else {
      nextSquarers[i] = "O";
    }
    onPlay(nextSquarers);
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

// Adding time travel.

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSqures = history[currentMove];

  function handleplay(nextSquarers) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquarers];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to the game start";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSqures} onPlay={handleplay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default App;

// to remember things Component use State.
// here App is top lavel component.
// here i pass xIsNext, historty and handleplay as "Props" to the Board component. for this we have to make extra move let’s make the Board component fully controlled by the props it receives. for this in function Board set variable (xIsNext, historty, handleplay)
// (You can read the ...history spread syntax as “enumerate all the items in history”.)
// For example, if history is [[null,null,null], ["X",null,null]] and nextSquares is ["X",null,"O"], then the new [...history, nextSquares] array will be [[null,null,null], ["X",null,null], ["X",null,"O"]].

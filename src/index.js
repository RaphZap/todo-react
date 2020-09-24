import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
          <button
              className={props.samp} onClick={props.onClick}>    
            {props.value}
         </button>
    );
}

class Board extends React.Component {        
    renderSquare(i) {
        let arr = getWinnerIndices(this.props.squares);
        let winSquare = "square";
        if (arr)
            for (let k = 0; k < arr.length; k++) {
                if (i === arr[k]) {
                    winSquare = "winSquare";
                    break;
                }
            }
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                samp={winSquare}
            />
        );
    }

    render() {
        const row = <div className="board-row">  
        </div>;
        let i, j;
        let boardDiv = [];
        for (i = 0; i < 3; i++) {
            boardDiv.push(row);
            for (j = 0 ; j < 3; j++) {
                boardDiv.push(this.renderSquare(3 * i + j));
            }
        }

        return (
          <div>
            {boardDiv}
          </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                column: null,
                row: null,
            }],
            xIsNext: true,
            stepNumber: 0,
            isAscend: true        
        };

        this.onClickSort = this.onClickSort.bind(this);
    }

    onClickSort() {
        this.setState({
            isAscend: !this.state.isAscend
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        let n = 0;
        let x = -1, y = -1;
        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                if (n === i)
                    break;
                n++;
            }
            if (n === i)
                break;
        }
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                column: x,
                row: y,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,            
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        
        const moves = history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            const modDesc = this.state.stepNumber === move ? <b>{desc}</b> : desc;

            const col = move ? step.column : -9;
            const row = move ? step.row : -9;
            const loc = move ? <a> ({col}, {row}) </a> : '';            

            return (
                <li key={move}>
                    <button onClick={() =>
                        this.jumpTo(move)}> {modDesc} </button>
                        {loc}
                </li>
            );
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else if (this.state.stepNumber === 9) {
            status = <b>Match is a draw!</b>;
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
          <div className="game">
            <div className="game-board">
                <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <div>Sort by: 
                <button onClick={this.onClickSort}>{this.state.isAscend ? 'Ascending' : 'Descending'}</button>
              </div>
              <ol>{this.state.isAscend ? moves : moves.reverse()}</ol>
            </div>
          </div>
        );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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

function getWinnerIndices(squares) {
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
            return lines[i];
        }
    }
    return null;
}
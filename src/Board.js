import React from 'react';
import Square from './Square';

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

export default Board;

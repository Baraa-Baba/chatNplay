import React, { useEffect, useState } from 'react';
import './TicTak.scss';
import { toast } from '../Toast/Toast';

function TicTak({isX,passedXIndex,sendBoardSocket,setPassedXIndex}) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);  
  const [yourScore,setyourScore]=useState(0)
  const [oppenontScore,setoppenontScore]=useState(0)
  const [IsRestedClicked,setIsRestedClicked]=useState(false)
  useEffect(()=>{
    if(passedXIndex!=undefined&&passedXIndex!=null){
    drawOnTheBoard(passedXIndex,!isX)
    }
  },[passedXIndex])
  function drawOnTheBoard(index,whoIsX){  
      
        const newBoard = [...board]; 
        if (calculateWinner(newBoard) || newBoard[index]) {
          return;
        }
        newBoard[index] = xIsNext ? 'X' : 'O';
        setBoard(newBoard); 
        
        setXIsNext(!xIsNext);  
  }
  const handleClick =(i)=>{
    if(isX===xIsNext){  
  const newBoard = [...board]; 
  if (calculateWinner(newBoard) || newBoard[i]) {
    return;
  }
  newBoard[i] = xIsNext ? 'X' : 'O';
  setBoard(newBoard);
  sendBoardSocket(i)
  
  setXIsNext(!xIsNext); 
  }else{
    toast.info("It's not your turn")
  }
}

  const renderSquare = (i) => (
    <button className={`square square${i}`} onClick={() => handleClick(i)}>
      {board[i]}
    </button>
  );

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `it is ${xIsNext ? 'X' : 'O'}'s turn`;

    function resetGame() {
      if (calculateWinner(board) || board.every((square) => square !== null)) {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setIsRestedClicked(true);
        setPassedXIndex(null);

        for(let i=0;i<document.getElementsByClassName('square').length;i++){
          document.getElementsByClassName('square')[i].textContent=''
        } 
        setTimeout(() => {
          setIsRestedClicked(false);
        }, 5000);
      }
    }
    
    useEffect(()=>{
      resetGame()
      if(calculateWinner(board)=="X"&&isX){
        setyourScore(yourScore+1)
      }
      if(calculateWinner(board)=="X"&&!isX){
        setoppenontScore(oppenontScore+1)
      }
      if(calculateWinner(board)=="O"&&!isX){
        setyourScore(yourScore+1)
      }
      if(calculateWinner(board)=="O"&&isX){
        setoppenontScore(oppenontScore+1)
      }

    },[board])
  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">
        <div> 
          you are {isX?'X':'O'} <br />
          it is {isX&&xIsNext||!isX&&!xIsNext?'your turn':'the oppenent turn'} <br />
          your score: {yourScore} <br />
          oppenont score:  {oppenontScore}
        </div>
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
  let isDraw=true
  for(let i=0;i<squares.length;i++ ){
    if(!squares[i]){
      isDraw=false
    }
  }
  if(isDraw){
    return 'draw'
  }
  return null;
}

export default TicTak;

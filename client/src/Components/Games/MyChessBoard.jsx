import { useEffect, useState } from "react";
import Chess from "chess.js";
import { Chessboard } from "react-chessboard";
import './MyChessBoard.scss'
export default function MyChessBoard({ isWhite, sendMoveSocket, passedMove }) {
  const [game, setGame] = useState(new Chess());
  const [userScore, setUserScore] = useState(0)
  const [partnerScore, setpartnerScore] = useState(0)
  function makeAMove(move) {
    const gameCopy = { ...game };
    if (gameCopy.turn() == 'w' && isWhite || gameCopy.turn() == 'b' && !isWhite) {
      const result = gameCopy.move(move);
      sendMoveSocket(move)

      const possibleMoves = gameCopy.moves();
      if (gameCopy.game_over() || gameCopy.in_draw() || possibleMoves.length === 0) {
        if (gameCopy.in_checkmate()) {
          setUserScore(userScore + 1)

        }
        gameCopy.reset()
        console.log(gameCopy)
      }
      setGame(gameCopy);

      return result; // null if the move was illegal, the move object if the move was legal
    }

  }
  useEffect(() => {
    if (passedMove) {
      const gameCopy = { ...game };
      const result = gameCopy.move(passedMove);
      const possibleMoves = gameCopy.moves();
      if (gameCopy.game_over() || gameCopy.in_draw() || possibleMoves.length === 0) {
        alert(gameCopy.in_checkmate())
        if (gameCopy.in_checkmate()) {
          setpartnerScore(partnerScore + 1)

        }
        gameCopy.reset()
        console.log(gameCopy)
      }
      setGame(gameCopy);
    }
  }, [passedMove])
  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    makeAMove(possibleMoves[randomIndex]);
  }

  function onDrop(sourceSquare, targetSquare) {
    if (sourceSquare, targetSquare) {
      const move = makeAMove({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
    }

  }

  return (
    <div className="ChessCont">
      <div className='cessBoardCont' >
        <Chessboard position={game.fen()} onPieceDrop={onDrop}
          boardOrientation={isWhite ? 'white' : 'black'} />
      </div>

      <div className="chess-info">
        <p>your score: {userScore}</p>
        <p>opponent score: {partnerScore}</p>
      </div>
    </div>
  );
}
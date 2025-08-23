'use client';

import { useState } from 'react';
import type { Square, ChessMove } from '@/lib/types';
import { ChessSquare } from './chess-square';
import type { Piece } from 'chess.js';

type ChessboardProps = {
  board: (Piece | null)[][];
  onMove: (move: { from: Square; to: Square; promotion?: string }) => void;
  getPossibleMoves: (square: Square) => ChessMove[];
  isMyTurn: boolean;
};

const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const Chessboard = ({ board, onMove, getPossibleMoves, isMyTurn }: ChessboardProps) => {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<ChessMove[]>([]);

  const handleSquareClick = (square: Square) => {
    if (!isMyTurn) return;

    if (selectedSquare) {
      const move = possibleMoves.find((m) => m.to === square);
      if (move) {
        onMove({ from: selectedSquare, to: square });
      }
      setSelectedSquare(null);
      setPossibleMoves([]);
    } else {
      const piece = board[8 - parseInt(square[1], 10)][square.charCodeAt(0) - 'a'.charCodeAt(0)];
      if (piece && piece.color === 'w') { // Assuming player is always white
        const moves = getPossibleMoves(square);
        if (moves.length > 0) {
          setSelectedSquare(square);
          setPossibleMoves(moves);
        }
      }
    }
  };
  
  return (
    <div className="w-full max-w-lg aspect-square shadow-2xl rounded-lg overflow-hidden border-4 border-card">
      <div className="grid grid-cols-8">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => {
            const square = `${files[colIndex]}${ranks[rowIndex]}` as Square;
            const isLight = (rowIndex + colIndex) % 2 !== 0;
            const isPossible = possibleMoves.some((move) => move.to === square);
            
            return (
              <ChessSquare
                key={square}
                square={square}
                piece={piece}
                isLight={isLight}
                onClick={handleSquareClick}
                isSelected={selectedSquare === square}
                isPossibleMove={isPossible}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

'use client';

import { useState, useMemo, useCallback } from 'react';
import { Chess } from 'chess.js';
import type { Square, Piece, Move, Color } from 'chess.js';

export const useChessGame = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [history, setHistory] = useState<Move[]>([]);

  const updateState = useCallback((updatedGame: Chess) => {
    setFen(updatedGame.fen());
    setHistory(updatedGame.history({ verbose: true }));
  }, []);

  const move = useCallback(
    (moveTo: string | { from: string; to: string; promotion?: string }) => {
      const gameCopy = new Chess(game.fen());
      try {
        const result = gameCopy.move(moveTo);
        if (result) {
          setGame(gameCopy);
          updateState(gameCopy);
        }
        return result;
      } catch (e) {
        console.warn("Invalid move:", e);
        return null;
      }
    },
    [game, updateState]
  );

  const reset = useCallback(() => {
    const newGame = new Chess();
    setGame(newGame);
    updateState(newGame);
  }, [updateState]);

  const board = useMemo(() => game.board(), [fen]);
  const turn = useCallback(() => game.turn(), [fen]);
  const get = useCallback((square: Square) => game.get(square), [fen]);
  const pgn = useMemo(() => game.pgn(), [fen]);

  const isGameOver = useMemo(() => game.isGameOver(), [fen]);
  const isCheckmate = useMemo(() => game.isCheckmate(), [fen]);
  const isDraw = useMemo(() => game.isDraw(), [fen]);
  const isStalemate = useMemo(() => game.isStalemate(), [fen]);
  const isThreefoldRepetition = useMemo(() => game.isThreefoldRepetition(), [fen]);
  const isInsufficientMaterial = useMemo(() => game.isInsufficientMaterial(), [fen]);

  return {
    game,
    board,
    fen,
    history,
    pgn,
    turn,
    move,
    reset,
    get,
    isGameOver,
    isCheckmate,
    isDraw,
    isStalemate,
    isThreefoldRepetition,
    isInsufficientMaterial,
  };
};

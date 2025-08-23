'use client';

import * as React from 'react';
import { Chessboard } from '@/components/game/chessboard';
import { useChessGame } from '@/hooks/use-chess-game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoveHistory } from '@/components/game/move-history';
import { AiSuggestion } from '@/components/game/ai-suggestion';
import { aiPlayChess } from '@/ai/flows/ai-play-chess';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Crown, BrainCircuit } from 'lucide-react';

export default function Home() {
  const {
    game,
    board,
    move,
    reset,
    history,
    turn,
    fen,
    isGameOver,
    isCheckmate,
    isDraw,
    isStalemate,
    isThreefoldRepetition,
    isInsufficientMaterial,
    get,
    pgn,
  } = useChessGame();
  const { toast } = useToast();
  const [isAiThinking, setIsAiThinking] = React.useState(false);

  const playerColor = 'w';
  const aiColor = 'b';

  React.useEffect(() => {
    if (turn() === aiColor && !isGameOver) {
      const makeAiMove = async () => {
        setIsAiThinking(true);
        try {
          const result = await aiPlayChess({
            currentBoardState: fen,
            userMove: history.length > 0 ? history[history.length - 1].san : undefined,
            moveHistory: history.map((h) => h.san),
          });
          move(result.aiMove);
        } catch (error) {
          console.error('AI move failed:', error);
          toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'The AI failed to make a move. You can try again or start a new game.',
          });
        } finally {
          setIsAiThinking(false);
        }
      };
      makeAiMove();
    }
  }, [turn, isGameOver, fen, history, move, toast]);
  
  const getGameStatus = () => {
    if (!isGameOver) {
      return turn() === 'w' ? "White's Turn" : "Black's Turn";
    }
    if (isCheckmate) {
      return `Checkmate! ${turn() === 'w' ? 'Black' : 'White'} wins.`;
    }
    if (isDraw) {
      if(isStalemate) return "Stalemate! It's a draw.";
      if(isThreefoldRepetition) return "Threefold repetition! It's a draw.";
      if(isInsufficientMaterial) return "Insufficient material! It's a draw.";
      return "It's a draw.";
    }
    return 'Game Over';
  };

  return (
    <>
      <main className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-4">
            <Crown className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-center font-headline">AI Chess Master</h1>
          </div>
          <p className="text-muted-foreground mt-2">{getGameStatus()}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <AiSuggestion fen={fen} turn={turn()} history={history.map(h => h.san)} isAiThinking={isAiThinking} />
          </div>

          <div className="lg:col-span-2 order-1 lg:order-2 flex justify-center items-start">
             <Chessboard
                board={board}
                onMove={move}
                getPossibleMoves={(square) => get(square) ? game.moves({ square, verbose: true }) : []}
                isMyTurn={turn() === playerColor && !isAiThinking && !isGameOver}
             />
          </div>

          <div className="lg:col-span-1 order-3 lg:order-3">
            <Card>
              <CardHeader>
                <CardTitle>Game Info</CardTitle>
              </CardHeader>
              <CardContent>
                <MoveHistory history={history} />
                <Button onClick={reset} className="w-full mt-4">
                  New Game
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <AlertDialog open={isGameOver}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Game Over</AlertDialogTitle>
            <AlertDialogDescription>
              {getGameStatus()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={reset}>Play Again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

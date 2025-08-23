import { cn } from '@/lib/utils';
import type { ChessPiece, Square } from '@/lib/types';
import { ChessPieceComponent } from './chess-piece';

type ChessSquareProps = {
  square: Square;
  piece: ChessPiece | null;
  isLight: boolean;
  onClick: (square: Square) => void;
  isSelected: boolean;
  isPossibleMove: boolean;
};

export const ChessSquare = ({ square, piece, isLight, onClick, isSelected, isPossibleMove }: ChessSquareProps) => {
  const bgClass = isLight ? 'bg-stone-200' : 'bg-primary/80';
  
  return (
    <div
      onClick={() => onClick(square)}
      className={cn(
        'w-full h-full flex items-center justify-center relative aspect-square',
        bgClass,
        'transition-colors duration-300'
      )}
    >
      {piece && <ChessPieceComponent piece={piece} />}
      {isSelected && (
        <div className="absolute inset-0 bg-accent/50 border-2 border-accent" />
      )}
      {isPossibleMove && (
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/3 h-1/3 rounded-full bg-accent/50" />
        </div>
      )}
    </div>
  );
};

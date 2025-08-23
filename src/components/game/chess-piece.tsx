import type { ChessPiece } from '@/lib/types';
import { cn } from '@/lib/utils';

type ChessPieceProps = {
  piece: ChessPiece;
  className?: string;
};

const pieceMap: Record<ChessPiece['type'], (color: 'black' | 'white') => React.ReactNode> = {
  p: (color) => (
    <svg viewBox="0 0 45 45" className={cn('w-full h-full', color === 'white' ? 'fill-white stroke-black' : 'fill-black stroke-white')}>
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38-1.95 1.12-3.28 3.21-3.28 5.62 0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5c0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" />
        <path d="M12.5 36h20" />
        <path d="M12.5 32.5h20" />
        <path d="M15 30h15" />
      </g>
    </svg>
  ),
  r: (color) => (
    <svg viewBox="0 0 45 45" className={cn('w-full h-full', color === 'white' ? 'fill-white stroke-black' : 'fill-black stroke-white')}>
      <g strokeWidth="1.5" strokeLinejoin="round">
        <path d="M9 39h27v-3H9v3zM12 36h21v-4H12v4zM11 14V9h4v2h5V9h5v2h5V9h4v5" />
        <path d="M34 14l-3 3H14l-3-3" />
        <path d="M31 17v12.5H14V17" />
        <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
        <path d="M14 17h17" />
      </g>
    </svg>
  ),
  n: (color) => (
    <svg viewBox="0 0 45 45" className={cn('w-full h-full', color === 'white' ? 'fill-white stroke-black' : 'fill-black stroke-white')}>
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10c1.5 0 3.5 1.5 3.5 3.5 0 2-1.5 3.5-3.5 3.5s-3.5-1.5-3.5-3.5c0-2 2-3.5 3.5-3.5zM24 16c0 2 1.5 4 1.5 4-1.5 1-2.5 2.5-2.5 4.5V31H12V25.5c0-3 1.5-5.5 4.5-5.5 2.5 0 4-1.5 4-4s-1.5-4-4-4c-2 0-4 1.5-4 4" />
        <path d="M12 31.5h21" />
        <path d="M12.5 36h18" />
      </g>
    </svg>
  ),
  b: (color) => (
    <svg viewBox="0 0 45 45" className={cn('w-full h-full', color === 'white' ? 'fill-white stroke-black' : 'fill-black stroke-white')}>
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 36h27" />
        <path d="M15 32h15" />
        <path d="M22.5 8c-1.4 0-2.5 1.1-2.5 2.5 0 .8.4 1.5.9 1.9-2.3.6-4.4 2.3-4.4 4.6 0 2.8 2.2 5 5 5s5-2.2 5-5c0-2.3-2.1-4-4.4-4.6.5-.4.9-1.1.9-1.9 0-1.4-1.1-2.5-2.5-2.5z" />
        <path d="M17.5 20h10l-2.5 6.5h-5z" />
        <path d="M17.5 20s-2-2.5-2.5-5.5c-.5-3 2.5-5 2.5-5" />
        <path d="M27.5 20s2-2.5 2.5-5.5c.5-3-2.5-5-2.5-5" />
      </g>
    </svg>
  ),
  q: (color) => (
    <svg viewBox="0 0 45 45" className={cn('w-full h-full', color === 'white' ? 'fill-white stroke-black' : 'fill-black stroke-white')}>
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm14.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM22.5 25s4.5-7.5 3-10.5c-1-2-9-2-10 0-1.5 3 4 10.5 7 10.5z" />
        <path d="M11.5 36h22" />
        <path d="M11.5 32.5h22" />
        <path d="M14 29.5h17" />
        <path d="M14 29.5c0-3 1.5-6 4-6h5c2.5 0 4 3 4 6" />
        <path d="M25 23.5s2.5-3 1-4.5c-.5-1-3.5-1-4 0-1.5 1.5 2 4.5 3 4.5z" />
      </g>
    </svg>
  ),
  k: (color) => (
    <svg viewBox="0 0 45 45" className={cn('w-full h-full', color === 'white' ? 'fill-white stroke-black' : 'fill-black stroke-white')}>
      <g strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.5 11.63V6M20 8h5" />
        <path d="M22.5 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zM12.5 36h20" />
        <path d="M12.5 32.5h20" />
        <path d="M15 30h15" />
        <path d="M18 27.5h9" />
      </g>
    </svg>
  ),
};


export const ChessPieceComponent = ({ piece, className }: ChessPieceProps) => {
  if (!piece) return null;
  const PieceSvg = pieceMap[piece.type];
  const pieceColor = piece.color === 'w' ? 'white' : 'black';

  return (
    <div className={cn("w-full h-full p-1 cursor-pointer", className)}>
        {PieceSvg(pieceColor)}
    </div>
  )
};

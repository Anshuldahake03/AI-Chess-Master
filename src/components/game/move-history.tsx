import * as React from 'react';
import type { ChessMove } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

type MoveHistoryProps = {
  history: ChessMove[];
};

export const MoveHistory = ({ history }: MoveHistoryProps) => {
  const movePairs: { white: string, black: string | null }[] = [];
  for (let i = 0; i < history.length; i += 2) {
    movePairs.push({
      white: history[i].san,
      black: history[i + 1] ? history[i + 1].san : null,
    });
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-center">Move History</h3>
      <Separator />
      <ScrollArea className="h-64 mt-2 pr-4">
        <div className="grid grid-cols-[auto_1fr_1fr] gap-x-4 gap-y-1 text-sm">
          {movePairs.map((pair, index) => (
            <React.Fragment key={index}>
              <div className="text-muted-foreground font-medium">{index + 1}.</div>
              <div className="font-mono">{pair.white}</div>
              <div className="font-mono">{pair.black}</div>
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { suggestChessMoves } from '@/ai/flows/suggest-chess-moves';
import type { SuggestChessMovesOutput } from '@/ai/flows/suggest-chess-moves';
import { useToast } from '@/hooks/use-toast';
import { Lightbulb, BrainCircuit } from 'lucide-react';

type AiSuggestionProps = {
  fen: string;
  turn: 'w' | 'b';
  history: string[];
  isAiThinking: boolean;
};

export const AiSuggestion = ({ fen, turn, history, isAiThinking }: AiSuggestionProps) => {
  const [suggestion, setSuggestion] = useState<SuggestChessMovesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setSuggestion(null);
    try {
      const result = await suggestChessMoves({
        boardState: fen,
        turn: turn === 'w' ? 'white' : 'black',
        moveHistory: history,
      });
      setSuggestion(result);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      toast({
        variant: 'destructive',
        title: 'Suggestion Error',
        description: 'Failed to get an AI suggestion. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6" />
          AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGetSuggestion} disabled={isLoading || isAiThinking} className="w-full">
          {isLoading ? 'Thinking...' : 'Get Suggestion'}
        </Button>
        <div className="mt-4 space-y-4">
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          )}
          {suggestion && (
            <div className="p-4 bg-muted/50 rounded-lg">
              {suggestion.isOpeningStrategy && (
                 <p className="text-sm font-semibold text-accent mb-2 flex items-center gap-1">
                    <Lightbulb className="w-4 h-4" />
                    Opening Strategy
                </p>
              )}
              <p className="text-lg font-bold font-mono text-primary">{suggestion.suggestedMove}</p>
              <p className="text-sm text-muted-foreground mt-1">{suggestion.reasoning}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

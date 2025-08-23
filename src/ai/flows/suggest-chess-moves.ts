'use server';

/**
 * @fileOverview An AI agent to suggest chess moves.
 *
 * - suggestChessMoves - A function that provides chess move suggestions.
 * - SuggestChessMovesInput - The input type for the suggestChessMoves function.
 * - SuggestChessMovesOutput - The return type for the suggestChessMoves function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestChessMovesInputSchema = z.object({
  boardState: z
    .string()
    .describe(
      'A string representing the current state of the chessboard in Forsyth–Edwards Notation (FEN).'
    ),
  turn: z.enum(['white', 'black']).describe('The current turn (white or black).'),
  moveHistory: z.array(z.string()).describe('An array of previous moves in algebraic notation.'),
});
export type SuggestChessMovesInput = z.infer<typeof SuggestChessMovesInputSchema>;

const SuggestChessMovesOutputSchema = z.object({
  suggestedMove: z.string().describe('The suggested chess move in algebraic notation.'),
  reasoning: z.string().describe('The AI reasoning behind the suggested move.'),
  isOpeningStrategy: z.boolean().describe('Whether the AI is providing an opening strategy suggestion.'),
});
export type SuggestChessMovesOutput = z.infer<typeof SuggestChessMovesOutputSchema>;

export async function suggestChessMoves(input: SuggestChessMovesInput): Promise<SuggestChessMovesOutput> {
  return suggestChessMovesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestChessMovesPrompt',
  input: {schema: SuggestChessMovesInputSchema},
  output: {schema: SuggestChessMovesOutputSchema},
  prompt: `You are a grandmaster chess player providing move suggestions to a user.

  Based on the current board state, the current turn, and the move history, suggest the best next move for the user.

  Explain your reasoning behind the move.

  If the game is in the opening phase (first 5 moves), suggest a common opening strategy and set isOpeningStrategy to true.
  Otherwise, focus on suggesting safe and advantageous moves and set isOpeningStrategy to false.

  Current Board State (FEN): {{{boardState}}}
  Current Turn: {{{turn}}}
  Move History: {{#each moveHistory}}{{{this}}} {{/each}}
  `,
});

const suggestChessMovesFlow = ai.defineFlow(
  {
    name: 'suggestChessMovesFlow',
    inputSchema: SuggestChessMovesInputSchema,
    outputSchema: SuggestChessMovesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

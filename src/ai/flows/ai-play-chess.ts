'use server';

/**
 * @fileOverview A Genkit flow for playing chess against an AI opponent.
 *
 * - aiPlayChess - A function to initiate and manage a chess game against an AI.
 * - AIPlayChessInput - The input type for the aiPlayChess function.
 * - AIPlayChessOutput - The return type for the aiPlayChess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPlayChessInputSchema = z.object({
  currentBoardState: z.string().describe('A string representation of the current chessboard state in FEN notation.'),
  userMove: z.string().optional().describe('The user-made move in algebraic notation, e.g., e2e4. Optional for the AI first move.'),
  moveHistory: z.array(z.string()).optional().describe('An array of previous moves in algebraic notation.'),
});
export type AIPlayChessInput = z.infer<typeof AIPlayChessInputSchema>;

const AIPlayChessOutputSchema = z.object({
  aiMove: z.string().describe('The AI-generated move in algebraic notation, e.g., g8f6.'),
  reasoning: z.string().describe('The AI reasoning for its move.'),
});
export type AIPlayChessOutput = z.infer<typeof AIPlayChessOutputSchema>;

export async function aiPlayChess(input: AIPlayChessInput): Promise<AIPlayChessOutput> {
  return aiPlayChessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChessPrompt',
  input: {schema: AIPlayChessInputSchema},
  output: {schema: AIPlayChessOutputSchema},
  prompt: `You are a chess AI. Your goal is to make a valid and reasonable move for black.

Current Board State (FEN): {{{currentBoardState}}}
User's last move for white: {{{userMove}}}

Provide your move in algebraic notation and a brief reason. The move must be valid.
`,
});

const aiPlayChessFlow = ai.defineFlow(
  {
    name: 'aiPlayChessFlow',
    inputSchema: AIPlayChessInputSchema,
    outputSchema: AIPlayChessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

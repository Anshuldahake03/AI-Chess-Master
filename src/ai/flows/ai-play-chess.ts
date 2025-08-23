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
  newBoardState: z.string().describe('The new board state after the AI move, in FEN notation.'),
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
  prompt: `You are a grandmaster-level chess AI. You will analyze the current board state, the user's last move (if any), and the move history to generate the best possible move for white.

Consider both tactical and strategic factors, including:

*   **Material balance:** Evaluate the value of the pieces on the board for both sides.
*   **King safety:** Assess the safety of both kings and look for opportunities to attack the opponent's king or improve your own king's safety.
*   **Pawn structure:** Analyze the pawn structure for weaknesses and opportunities.
*   **Development:** Consider the development of your pieces and aim to control key squares and open files.
*   **User last move:** consider the user move

Based on your analysis, generate a legal chess move in algebraic notation (e.g., e2e4, Ng1f3, Ra8d8). Also, state your reasoning.

Output the move and the new board state in FEN notation after the move.

Current Board State (FEN): {{{currentBoardState}}}
User Move: {{{userMove}}}
Move History: {{#each moveHistory}}{{{this}}} {{/each}}

Make sure your move is valid.


Reasoning: [Provide detailed reasoning for the chosen move.]
AI Move: [The AI-generated move in algebraic notation]
New Board State (FEN): [The new board state in FEN notation]`,
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

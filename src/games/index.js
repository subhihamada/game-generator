import buildTicTacToe from './tictactoe';
import buildSnake      from './snake';
import buildChess      from './chess';

// ══════════════════════════════════════════════
//  Built-in games — work offline, no API needed
// ══════════════════════════════════════════════
export const BUILTIN_GAMES = {
  'تيك تاك تو' : buildTicTacToe,
  'tic tac toe' : buildTicTacToe,
  'شطرنج'       : buildChess,
  'chess'       : buildChess,
  'ثعبان'       : buildSnake,
  'snake'       : buildSnake,
};

/**
 * Returns the builtin HTML for a game name, or null if not found.
 * Matching is case-insensitive and partial.
 */
export function getBuiltin(name) {
  const lower = name.toLowerCase().trim();
  const key = Object.keys(BUILTIN_GAMES).find(
    k => lower.includes(k) || k.includes(lower)
  );
  return key ? BUILTIN_GAMES[key]() : null;
}

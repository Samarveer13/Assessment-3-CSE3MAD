/**
 * Profanity filter — same API as the obscenity package wrapper.
 * Uses regex with leet-speak substitutions, matching obscenity's approach.
 * Replaced the obscenity import because its @stdlib dependencies are
 * incompatible with React Native's Hermes JS engine.
 */

const WORD_LIST = [
  'shit', 'shite', 'fuck', 'fucker', 'fucking', 'fuk',
  'ass', 'arse', 'asshole', 'arsehole',
  'bitch', 'bastard', 'bullshit',
  'crap', 'damn', 'dick', 'cock', 'cunt',
  'piss', 'pussy', 'prick',
  'motherfucker', 'wanker', 'twat', 'tosser',
];

/** Expand a word to catch common leet-speak substitutions (@ for a, 3 for e, etc.) */
function toLeetPattern(word: string): string {
  return word
    .replace(/a/gi, '[a@4]')
    .replace(/e/gi, '[e3]')
    .replace(/i/gi, '[i1!|]')
    .replace(/o/gi, '[o0]')
    .replace(/s/gi, '[s$5]')
    .replace(/t/gi, '[t7+]')
    .replace(/l/gi, '[l1|]');
}

/** Build a fresh RegExp each call to avoid stateful lastIndex bugs */
function buildPattern(): RegExp {
  return new RegExp(WORD_LIST.map(toLeetPattern).join('|'), 'gi');
}

/** Returns true if the text contains any flagged words. */
export function containsProfanity(text: string): boolean {
  return buildPattern().test(text);
}

/** Replaces flagged words with asterisks, preserving first and last character. */
export function censorText(text: string): string {
  return text.replace(buildPattern(), (match) => {
    if (match.length <= 2) return '*'.repeat(match.length);
    return match[0] + '*'.repeat(match.length - 2) + match[match.length - 1];
  });
}

/** Returns how many flagged words were found. */
export function getMatchCount(text: string): number {
  return (text.match(buildPattern()) ?? []).length;
}

export function countLetters(str) {
  return str.split("").reduce((cs, l) => {
    cs[l] = (cs[l] || 0) + 1;
    return cs;
  }, {});
}

export function isMatch(word, letterCounts) {
  const ws = word.split("");
  return Object.entries(letterCounts).every(
    ([l, c]) => ws.filter((w) => w === l).length >= c
  );
}

import React from "react";
import { countLetters, isMatch } from "../utils";

const Word = React.memo(
  ({ name, highlight = "" }) => {
    const letters = name.split("");
    return (
      <li>
        {letters.map((l, i) => (
          <span className={highlight.includes(l) ? "h" : ""} key={i}>
            {l}
          </span>
        ))}
      </li>
    );
  },
  (prevProps, nextProps) => {
    const letters = prevProps.name.split("");
    // 'aahed' -> ['a', 'a', 'h', 'e', 'd']
    return letters.every((l) => {
      return (
        nextProps.highlight.includes(l) === prevProps.highlight.includes(l)
      );
    });
  }
);

const Words = function Words({ list, filter }) {
  const counts = countLetters(filter);
  const filteredList = list.filter((name) => isMatch(name, counts));
  return (
    <ul>
      {filteredList.map((name) => (
        <Word key={name} name={name} highlight={filter} />
      ))}
    </ul>
  );
};

export default Words;

import React from "react";
import { countLetters, isMatch } from "../utils";

function Word({ name, highlight = "" }) {
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
}

const Words = React.memo(function Words({ list, filter }) {
  const counts = countLetters(filter);
  const filteredList = list.filter((name) => isMatch(name, counts));
  return (
    <ul>
      {filteredList.map((name) => (
        <Word key={name} name={name} highlight={filter} />
      ))}
    </ul>
  );
});

export default Words;

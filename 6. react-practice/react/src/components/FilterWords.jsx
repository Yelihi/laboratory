import React, { useEffect, useState, useTransition } from "react";

import Words from "./Words";

const targetURL =
  "https://raw.githubusercontent.com/jason-chao/wordle-solver/main/english_words_original_wordle.txt";

export default function FilterWords() {
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(targetURL)
      .then((r) => r.text())
      .then((r) => setList(r.split("\n").sort()));
  }, []);
  const [filter, setFilter] = useState("");
  const [deferedrFilter, setDeferedFilter] = useState("");

  const [isPanding, startTransition] = useTransition();
  const handleChange = ({ target: { value } }) => {
    setFilter(value);

    startTransition(() => {
      setDeferedFilter(value);
    });
  };
  return (
    <main>
      <label>
        Filter:
        <input type='search' value={filter} onChange={handleChange} />
      </label>
      {isPanding ? (
        <p>Loading...</p>
      ) : (
        <Words list={list} filter={deferedrFilter} />
      )}
    </main>
  );
}

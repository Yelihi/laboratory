import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./Searchbar.module.css";

const Searchbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onClickSearch = () => {
    if (search !== "") {
      navigate(`/search?q=${search}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter") {
      onClickSearch();
    }
  };

  return (
    <div className={style.container}>
      <input
        value={search}
        onKeyDown={onKeyDown}
        onChange={onChangeSearch}
        placeholder='검색어를 입력하세요...'
      />
      <button onClick={onClickSearch}>검색</button>
    </div>
  );
};

export default Searchbar;

import { memo } from "react";
import style from "./Header.module.css";

const Header = () => {
  return (
    <div className={style.Header}>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};

export default memo(Header);

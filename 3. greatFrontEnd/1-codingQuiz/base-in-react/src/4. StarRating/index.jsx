import { useState } from "react";
import StarRating from "./StarRating";

import "./styles.css";

export default function App() {
  const [hover, setHover] = useState(0);

  return (
    <div>
      <StarRating maximum={5} current={hover} onChange={setHover} />
    </div>
  );
}

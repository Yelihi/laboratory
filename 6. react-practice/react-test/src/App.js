import { useState } from "react";

import Pagination from "./components/Pagenation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p data-testid='paragraph'>You Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <Pagination totalItems={9} itemsPerPage={3} />
    </div>
  );
}

export default App;

import "./App.css";
import { useReducer } from "react";
import Header from "./components/Header/Header";
import TodoEditor from "./components/TodoEditor/TodoEditor";
import TodoList from "./components/TodoList/TodoList";

import { reducer, defaultValue } from "./reducer/Todo";

function App() {
  const [todoLists, dispatch] = useReducer(reducer, defaultValue);

  return (
    <section className='App'>
      <Header />
      <TodoEditor dispatch={dispatch} />
      <TodoList todoList={todoLists} dispatch={dispatch} />
    </section>
  );
}

export default App;

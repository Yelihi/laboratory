import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import TodoEditor from "./components/TodoEditor/TodoEditor";
import TodoList from "./components/TodoList/TodoList";

import { TodoListItem } from "./components/TodoItem/TodoItem";

function App() {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  return (
    <section className='App'>
      <Header />
      <TodoEditor setTodoList={setTodoList} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </section>
  );
}

export default App;

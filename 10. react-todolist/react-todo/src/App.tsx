import "./App.css";
import { useState } from "react";
import Header from "./components/Header/Header";
import TodoEditor from "./components/TodoEditor/TodoEditor";
import TodoList from "./components/TodoList/TodoList";

import { TodoListItem } from "./components/TodoItem/TodoItem";

function App() {
  const [todoList, setTodoList] = useState<TodoListItem[]>([]);

  const deleteTodoItem = (id: number) => {
    const filterTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(filterTodoList);
  };

  const changeChecked = (id: number) => {
    const checkingTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCheck: !todo.isCheck };
      } else {
        return { ...todo };
      }
    });
    setTodoList(checkingTodoList);
  };

  return (
    <section className='App'>
      <Header />
      <TodoEditor setTodoList={setTodoList} />
      <TodoList
        todoList={todoList}
        deleteTodoItem={deleteTodoItem}
        changeChecked={changeChecked}
      />
    </section>
  );
}

export default App;

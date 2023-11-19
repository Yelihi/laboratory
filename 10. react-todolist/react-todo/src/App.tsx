import "./App.css";
import { useReducer, useCallback, useMemo } from "react";
import Header from "./components/Header/Header";
import TodoEditor from "./components/TodoEditor/TodoEditor";
import TodoList from "./components/TodoList/TodoList";
import { TodoStateContext, TodoDispatchContext } from "./TodoContext";
import { reducer, defaultValue } from "./reducer/Todo";

function App() {
  const [todoLists, dispatch] = useReducer(reducer, defaultValue);

  const onCreate = (content: string) => {
    dispatch({
      type: "ADD_TODO",
      data: content,
    });
  };

  const onCheck = useCallback((id: number) => {
    dispatch({
      type: "CHANGE_CHECK",
      data: id,
    });
  }, []);

  const onDelete = useCallback((id: number) => {
    dispatch({
      type: "DELETE_TODO",
      data: id,
    });
  }, []);

  const memoizationValue = useMemo(
    () => ({
      onCheck,
      onCreate,
      onDelete,
    }),
    []
  );

  return (
    <section className='App'>
      <Header />
      <TodoStateContext.Provider
        value={{
          todoLists,
        }}
      >
        <TodoDispatchContext.Provider value={memoizationValue}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </section>
  );
}

export default App;

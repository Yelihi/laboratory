import { useMemo } from "react";
import style from "./TodoList.module.css";

import TodoItem from "../TodoItem/TodoItem";
import { TodoListItem } from "../TodoItem/TodoItem";
import useSearchTodo from "../../hooks/useSearchTodo";

type TodoListProps = {
  todoList: TodoListItem[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList = ({ todoList, onCheck, onDelete }: TodoListProps) => {
  const [searchValue, onChange, resultTodoList] = useSearchTodo(todoList);

  // 만일 todoList 의 길이가 길어질수록 연산과정이 길어진다. 즉, todoList 가 변경되지 않으면 호출하지 않는게 좋다.
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todoList.length;
    const doneCount = todoList.filter((todo) => todo.isCheck).length;
    const notDoneCount = totalCount - doneCount;

    return { totalCount, doneCount, notDoneCount };
  }, [todoList]);

  return (
    <div className={style.TodoList}>
      <h4>Todos</h4>
      <div>전체 투두: {totalCount}</div>
      <div>완료 투두: {doneCount}</div>
      <div>미완 투두: {notDoneCount}</div>
      <input
        placeholder='검색어를 입력하세요'
        value={searchValue}
        onChange={onChange}
      />
      <div className={style.todosWrapper}>
        {resultTodoList.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              onCheck={onCheck}
              onDelete={onDelete}
              {...todo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;

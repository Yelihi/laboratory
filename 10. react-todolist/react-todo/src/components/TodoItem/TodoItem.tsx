import { memo, useContext } from "react";
import style from "./TodoItem.module.css";
import { TodoDispatchContext } from "../../TodoContext";

export type TodoListItem = {
  id: number;
  content: string;
  date: number;
  isCheck: boolean;
};

const TodoItem = (props: TodoListItem) => {
  const { onCheck, onDelete } = useContext(TodoDispatchContext)!;
  const { id, content, date, isCheck } = props;

  const onChangeChecked = () => {
    onCheck(id);
  };

  const onDeleteTodo = () => {
    onDelete(id);
  };

  return (
    <div className={style.TodoItem}>
      <input
        className={style.checkboxCol}
        type='checkbox'
        checked={isCheck}
        onChange={onChangeChecked}
      />
      <div className={style.content}>{content}</div>
      <div className={style.date}>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDeleteTodo}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);

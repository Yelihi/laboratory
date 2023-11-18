import style from "./TodoItem.module.css";

export type TodoListItem = {
  id: number;
  content: string;
  date: number;
  isCheck: boolean;
};

type TodoItemProps = TodoListItem & {
  deleteTodoItem: () => void;
  changeChecked: () => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { content, date, isCheck, deleteTodoItem, changeChecked } = props;

  return (
    <div className={style.TodoItem}>
      <input
        className={style.checkboxCol}
        type='checkbox'
        checked={isCheck}
        onChange={changeChecked}
      />
      <div className={style.content}>{content}</div>
      <div className={style.date}>{new Date(date).toLocaleDateString()}</div>
      <button onClick={deleteTodoItem}>삭제</button>
    </div>
  );
};

export default TodoItem;

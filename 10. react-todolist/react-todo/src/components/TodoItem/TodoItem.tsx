import style from "./TodoItem.module.css";

export type TodoListItem = {
  id: number;
  content: string;
  date: number;
  isCheck: boolean;
};

type TodoItemProps = TodoListItem & {
  deleteTodoItem: (id: number) => void;
  changeChecked: (id: number) => void;
};

const TodoItem = (props: TodoItemProps) => {
  const { id, content, date, isCheck, deleteTodoItem, changeChecked } = props;

  const onChangeChecked = () => {
    changeChecked(id);
  };

  const onDeleteTodo = () => {
    deleteTodoItem(id);
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

export default TodoItem;

/**
 * @description 완료되지 않은 todo 의 갯수를 반환
 * @param {*} todos
 * @returns
 */
const getTodoCount = (todos) => {
  // 완료되지 않은 todo 설정
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  // 만일 갯수가 1개라면
  if (length === 1) {
    return "1 item left";
  }

  return `${length} items left`;
};

/**
 * @description 현재의 todo 의 갯수를 업데이트가 된 target을 반환
 */
export default (targetElement, { todos }) => {
  // 전달받은 target 을 복사한다.
  const newCounter = targetElement.cloneNode(true);
  // 새로운 카운터에 텍스트값을 업데이트 한다. 여기선 todo의 갯수
  newCounter.textContent = getTodoCount(todos);
  return newCounter;
};

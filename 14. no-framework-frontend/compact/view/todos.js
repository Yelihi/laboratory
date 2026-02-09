/**
 * html 내 template 를 활용하기
 */
let template;

/**
 * @description 새로운 todo element 를 생성합니다.
 */
const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById("todo-item"); // template 내 bind 된 id
  }

  return template.content.firstElementChild.cloneNode(true); // 첫번째 요소를 클론
};

/**
 * @description todo 요소를 생성합니다.
 */
const getTodoElement = (todo, index, events) => {
  const { text, completed } = todo;

  // 새로운 todo element 를 생성합니다.
  const newTodoElement = createNewTodoNode();

  // 해당 요소에 text 값을 추가해줍니다.
  newTodoElement.querySelector("input.edit").value = text;
  newTodoElement.querySelector("label").textContent = text;

  // 만일 완료된 요소라면
  if (completed) {
    newTodoElement.classList.add("completed");
    newTodoElement.querySelector("input.toggle").checked = true;
  }

  // 버튼에 추가합니다.
  // 이벤트 위임을 위해 index 를 해당 버튼의 dataset 에 추가합니다.
  newTodoElement.querySelector("button.destroy").dataset.index = index;
  return newTodoElement;
};

/**
 * @description 현재의 todo 리스트를 업데이트가 된 target을 반환
 */
export default (targetElement, { todos }, events) => {
  // 타켓요소를 복사합니다.
  const newTodoList = targetElement.cloneNode(true);

  // 복사된 타겟의 innerHtml 을 초기화 합니다.
  newTodoList.innerHTML = "";

  // 순회를 돌면서 todo 요소를 생성합니다.
  todos
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach((element) => {
      newTodoList.appendChild(element);
    });

  // todoList 내 이벤트 위임
  newTodoList.addEventListener("click", (e) => {
    if (e.target.matches("button.destroy")) {
      events.deleteItem(e.target.dataset.index);
    }
  });

  return newTodoList;
};

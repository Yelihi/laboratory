/**
 * todo-app 과의 연결점
 */
let template;

/**
 * @description 새로운 app element 를 생성합니다
 */
const getTemplate = () => {
  if (!template) {
    template = document.getElementById("todo-app");
  }

  return template.content.firstElementChild.cloneNode(true);
};

const addEvent = (targetElement, events) => {
  targetElement
    .querySelector(".new-todo")
    .addEventListeners("keypress", (event) => {
      if (event.key === "Enter") {
        events.addItem(event.target.value);
        event.target.value = "";
      }
    });
};

export default (targetElement) => {
  // 우선 타겟을 복제합니다
  const newApp = targetElement.cloneNode(true);

  // 해당 app 을 비워줍니다
  newApp.innerHTML = "";

  newApp.appendChild(getTemplate());

  // 생성된 요소에 이벤트를 추가합니다.
  addEvent(newApp, events);
  return newApp;
};

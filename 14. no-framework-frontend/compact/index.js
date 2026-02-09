import getTodos from "./getTodos";
import applyDiff from "./applyDiff";
import registry from "./registry";

import todosView from "./view/todos";
import filterView from "./view/filter";
import counterView from "./view/counter";

// registry 에 등록
registry.add("todos", todosView);
registry.add("filter", filterView);
registry.add("counter", counterView);

// 현재 todo 리스트의 state
const state = {
  todos: [],
  currentFilter: "All", // 현재 선택된 필터
};

// event handler 생성
const events = {
  /**
   * @param {number} index
   * @description 해당 index 의 todo 를 삭제합니다.
   */
  deleteItem: (index) => {
    state.todos.splice(index, 1);
    render();
  },

  /**
   * @param {string} text
   * @description 해당 text 를 가진 todo 를 추가합니다.
   */
  addItem: (text) => {
    state.todos.push({ text, completed: false });
    render();
  },
};

// 렌더링을 진행
const render = () => {
  window.requestAnimationFrame(() => {
    // 루트 요소를 찾는다
    const main = document.querySelector(".todoapp");
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

render();

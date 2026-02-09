/**
 * requestAnimationFrame 콜백을 사용하여 현재 렌더링 사이클과 다음 사이클 사이의 시간을 추적하고
 * 콜백이 1초 내에 호출되는 횟수를 추적하면 된다.
 */

let panel;
let start;
let frames = 0;

const create = () => {
  const div = document.createElement("div");

  div.style.position = "fixed";
  div.style.left = "0px";
  div.style.top = "0px";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.backgroundColor = "black";
  div.style.color = "white";
  div.style.zIndex = 1000;

  return div;
};

const tick = () => {
  frames++;
  const now = window.performance.now();

  if (now >= start + 1000) {
    panel.innerText = `${frames} FPS`;
    frames = 0;
    start = now;
  }

  window.requestAnimationFrame(tick);
};

const init = (parent = document.body) => {
  panel = create();

  window.requestAnimationFrame(() => {
    start = window.performance.now();
    parent.appendChild(panel);
    tick();
  });
};

export default {
  init,
};

/**
 * @description 하단의 필터 버튼의 클릭 여부를 업데이트
 */
export default (targetElement, { currentFilter }) => {
  // 타겟요소를 복사합니다.
  const newCounter = targetElement.cloneNode(true);

  // completed 된 부분에 알맞은 class 를 추가하고, 아니면 지웁니다.
  Array.from(newCounter.querySelectorAll("li a")).forEach((a) => {
    if (a.textContent === currentFilter) {
      a.classList.add("selected");
    } else {
      a.classList.remove("selected");
    }
  });

  return newCounter;
};

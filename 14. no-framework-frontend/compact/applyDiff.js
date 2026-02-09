/**
 * diff 알고리즘
 * 실제 DOM 과 가상 DOM 을 비교하여 차이가 있는 부분을 업데이트 한다.
 */

/**
 * @description 같은 노드인지 확인
 * @param {*} nodeA 같은 노드
 * @param {*} nodeB 같은 노드
 */
const isNodeChanged = (nodeA, nodeB) => {
  // 1. 해당 노드들의 속성값의 갯수를 비교한다.
  const n1Attributes = nodeA.attributes;
  const n2Attributes = nodeB.attributes;

  // 만일 길이가 다르다면 노드가 변경된 것이다.
  if (n1Attributes.length !== n2Attributes.length) return true;

  // 2. 속성에 대해서 비교한다
  // 위에서 속성 갯수가 같다는 것을 확인함
  const differentAttributes = Array.from(n1Attributes).find((attribute) => {
    // 속성의 이름을 가져옴
    const { name } = attribute;
    // 각각의 노드의 속성값을 가져옴
    const n1Value = nodeA.getAttribute(name);
    const n2Value = nodeB.getAttribute(name);

    // 만일 값이 다르다면 변경된 것이다. (true)
    return n1Value !== n2Value;
  });

  if (differentAttributes) return true;

  // 3. 자식 노드가 없다면 해당 요소의 text 값 비교
  if (
    nodeA.children.length === 0 &&
    nodeB.children.length === 0 &&
    nodeA.textContent !== nodeB.textContent
  ) {
    return true;
  }

  // 4. 3가지 경우 모두 아니라면 노드가 변경된것이 아니다.
  return false;
};

/**
 * @description diff 알고리즘 실행
 */
const applyDiff = (parentNode, realNode, virtualNode) => {
  // 1. 실제 노드에는 있지만 가상 노드에는 없다면 삭제해준다
  if (realNode && !virtualNode) {
    realNode.remove();
    return;
  }

  // 2. 가상 노드에는 있지만 실제 없다면 추가
  if (!realNode && virtualNode) {
    parentNode.appendChild(virtualNode);
    return;
  }

  // 3. 실제 및 가상 노드가 모두 존재하고, 내부 노드가 변했다면 (가상 노드와 실제 노드 비교시)
  if (isNodeChanged(virtualNode, realNode)) {
    realNode.replaceWith(virtualNode);
    return;
  }

  // 트리 구조로 재귀를 돌리기 위해 자식 노드들을 호출
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);

  // 실제와 가상 노트 중 더 긴 요소를 순회의 기점으로 한다.
  const max = Math.max(realChildren.length, virtualChildren.length);

  // 순회를 돌면서 Diff 알고리즘을 적용시킨다.(재귀)
  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

export default applyDiff;

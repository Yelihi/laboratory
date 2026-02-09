/**
 * 각 상태를 업데이트 하는 함수들을 등록
 */

const registry = {};

const renderWrapper = (component) => {
  return (targetElement, state, events) => {
    const element = component(targetElement, state, events);

    // 자식 컴포넌트를 찾아서 등록
    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component; // data-component 의 값을 가져옴

      const child = registry[name];
      if (!child) return;

      target.replaceWith(child(target, state, events));
    });

    return element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export { add, renderRoot };

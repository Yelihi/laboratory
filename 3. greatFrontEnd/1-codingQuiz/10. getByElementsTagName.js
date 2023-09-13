function getByElementsTagName(rootElement, tagNameParam) {
  const elements = [];
  const tagName = tagNameParam.toUpperCase();

  function traverse(element) {
    if (element == null) return;

    if (element.tagName == tagName) {
      elements.push(element);
    }

    for (const child of element) {
      traverse(child);
    }
  }

  for (const child of rootElement.children) {
    traverse(child);
  }

  return elements;
}

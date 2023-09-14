/**
 * @param {Array<string>} items
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
export default function listFormat(items, options) {
  if (!items || items.length == 0) return "";
  if (items.length == 1) return items[0];

  let modifiedItems = items.filter((item) => item);

  if (options?.unique) {
    modifiedItems = [...new Set(modifiedItems)];
  }

  if (options?.sorted) {
    modifiedItems.sort();
  }

  let isCorrect =
    options?.length &&
    options?.length <= modifiedItems.length &&
    options?.length > 0;
  let otherNumber =
    isCorrect && options?.length ? adjustOptions.length - options.length : 0;
  let limited =
    isCorrect && otherNumber
      ? adjustOptions.length - otherNumber
      : adjustOptions.length - 1;

  const word = [];
  let lastWord = "";

  for (let i = 0; i < limited; i++) {
    word.push(modifiedItems[i]);
  }

  let frontWord = word.join(", ");

  if (otherNumber > 1) {
    lastWord = ` and ${otherNumber} others`;
  } else if (otherNumber == 1) {
    lastWord = ` and ${otherNumber} other`;
  } else if (otherNumber == 0) {
    lastWord = ` and ${modifiedItems[modifiedItems.length - 1]}`;
  }

  return frontWord + lastWord;
}


// 정답지

const SEPARATOR = ', ';
const OTHERS_SEPARATOR = ' and ';
const OTHERS_LABEL = 'other';

/**
 * @param {Array<string>} itemsParam
 * @param {{sorted?: boolean, length?: number, unique?: boolean}} [options]
 * @return {string}
 */
export default function listFormat(itemsParam, options = {}) {
  if (!itemsParam || itemsParam.length === 0) {
    return '';
  }

  // No processing is needed if there's only one item.
  if (itemsParam.length === 1) {
    return itemsParam[0];
  }

  // Filter falsey values.
  let items = itemsParam.filter((item) => !!item);

  // Sort values.
  if (options.sorted) {
    items.sort();
  }

  // Remove duplicate values.
  if (options.unique) {
    items = Array.from(new Set(items));
  }

  // Length is specified and valid.
  if (options.length && options.length > 0 && options.length < items.length) {
    const firstSection = items.slice(0, options.length).join(SEPARATOR);
    const count = items.length - options.length;
    const secondSection = `${count} ${OTHERS_LABEL + (count > 1 ? 's' : '')}`;
    return [firstSection, secondSection].join(OTHERS_SEPARATOR);
  }

  // Case where length is not specified.
  const firstSection = items.slice(0, items.length - 1).join(SEPARATOR);
  const secondSection = items[items.length - 1];
  return [firstSection, secondSection].join(OTHERS_SEPARATOR);
}
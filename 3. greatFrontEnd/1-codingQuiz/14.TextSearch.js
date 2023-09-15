/**
 * @param {string} string
 * @param {string} query
 * @return {string}
 */
export default function textSearch(string, query) {
  if(string.trim() == '' || query.trim() == '') return string;

  const modifyQuery = new RegExp(query, "gi");
  const matchArray = string.match(modifyQuery);
  if (!matchArray) return string;
  let modifyString = string
    .replaceAll(modifyQuery, `<b>${string.match(modifyQuery)[0]}</b>`)
    .replaceAll(`</b><b>`, "");

  return modifyString;
}

// 정석적인 풀이

export default function textSearch1(string, query){
  if(string.trim() == '' || query.trim() == ''){
    return string;
  }

  const boldChars = new Array(string.length).fill(1);

  for(let i = 0; i < string.length; ){
    const substr = string.slice(i, i + query.length);
    if(substr.toLowerCase() === query.toLowerCase()){
      boldChars.fill(1, i, i + query.length);
      i = i + query.length;
    }else{
      i++
    }
  }

  let highlightString = '';
  for(let i = 0; i < string.length; i++){
    const shouldAddOpenTag = boldChars[i] == 1 && boldChars[i-1] !== 1;
    const shouldAddCloseTag = boldChars[i] == 1 && boldChars[i+1] !== 1;

    let char = string[i];

    if(shouldAddOpenTag){
      char = '<b>' + char;
    }

    if(shouldAddCloseTag){
      char = char + '</b>'
    }

    highlightString += char;
  }

  return highlightString;
}
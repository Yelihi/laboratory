/**
 * @param {string} string
 * @param {Array<string>} queries
 * @return {string}
 */
export default function textSearch(string, queries){
  if(string.trim() == ''){
    return string;
  }

  const boldChars = new Array(string.length).fill(0);

  for(const query of queries){
    for(let i = 0; i < string.length; ){
      const substr = string.slice(i, i + query.length);
      if(substr.toLowerCase() === query.toLowerCase()){
        boldChars.fill(1, i, i + query.length);
        i = i + query.length;
      }else{
        i++
      }
    }
  }


  let highlightString = ""
  for(let i = 0; i < string.length; i++){
    const shouldAddOpenTag = boldChars[i] === 1 && boldChars[i - 1] !== 1;
    const shouldAddCloseTag = boldChars[i] === 1 && boldChars[i + 1] !== 1;

    let char = string[i];

    if(shouldAddOpenTag){
      char = '<b>' + char
    }

    if(shouldAddCloseTag){
      char = char + '</b>'
    }

    highlightString += char

  }

  return highlightString
}

// 처음에 내가 푼 풀이

/**
 * @param {string} string
 * @param {Array<string>} queries
 * @return {string}
 */
export default function textSearch(string, queries) {
  if(string.trim() == '' || queries.length === 0 || queries[0].trim() === '') return string;

  const boldChars = Array(string.length).fill(0);

  for(let i = 0; i < string.length; ){
    if(queries.length === 1){
      const query = queries[0];
      const substr = string.slice(i, i + query.length);
      if(substr.toLowerCase() === query.toLowerCase()){
        boldChars.fill(1, i, i + query.length);
        i = i + query.length;
      }else{
        i++
      }
    }else{
      for(const query of queries){
        const substr = string.slice(i, i + query.length);
        if(substr.toLowerCase() === query.toLowerCase()){
          boldChars.fill(1, i, i + query.length);
          break;
        }
      }
      i++;
    }
  }

  let highlightString = ''
  for(let i = 0; i < string.length; i++){
    const shouldAddOpenTag = boldChars[i] == 1 && boldChars[i-1] !== 1;
    const shouldAddCloseTag = boldChars[i] == 1 && boldChars[i+1] !== 1;

    let char = string[i];

    if(shouldAddOpenTag){
      char = '<b>' + char
    }

    if(shouldAddCloseTag){
      char = char + '</b>'
    }

    highlightString += char
  }

  return highlightString
}
// joinOr.js

function joinOr(array, delimiter = ', ', conjunction = 'or') {
  if (!Array.isArray(array)) return undefined;
  if (array.length === 1) return array.toString();

  let joinedArray = array.join(delimiter);
  
  let lastDelimiterIndex = joinedArray.length 
                         - array[array.length - 1].toString().length 
                         - 2;
                         
  let sliceEndIndex = array.length > 2 ? lastDelimiterIndex + 1
                                         : lastDelimiterIndex;
                                         
  return `${joinedArray.slice(0, sliceEndIndex)} ${conjunction} ` +
    `${array[array.length - 1].toString()}`;
}
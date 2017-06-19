/**
 * returns the current translateX of an elements in the style.transform value,
 * if string is like 'translate(-99px, 0)'
 *
 * @return {number} translateX pixel value
 */

const translateXRegex = /translate\(([-]?[0-9]+(.[0-9]+)?)px/;

export function getTranslateXPx (elem) {
  const rule = new RegExp(translateXRegex);
  const result = rule.exec(elem.style.transform);

  if (result) {
    return parseInt(result[1], 10);
  }

  return 0;
}

/**
 * calculates the current right position value of the container without excl.
 * transform: translateX
 *
 * @return {number} current right withouth translateX
 */
export function getPositionRight (elem) {
  return elem.getBoundingClientRect().right - getTranslateXPx(elem);
}

/**
 * calculates the current left position value of the container without excl.
 * transform: translateX
 *
 * @return {number} current left withouth translateX
 */
export function getPositionLeft (elem) {
  return elem.getBoundingClientRect().left - getTranslateXPx(elem);
}

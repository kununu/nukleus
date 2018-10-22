import {isBrowser} from './executionEnvironment';

export default function getElementPositionY (element, offset = 0) {
  if (!isBrowser) return 0;
  const box = element.getBoundingClientRect();
  const {
    body
  } = document;

  const scrollTop = window.pageYOffset || body.scrollTop;
  const clientTop = body.clientTop || 0;
  return (box.top + scrollTop) - clientTop - offset;
}

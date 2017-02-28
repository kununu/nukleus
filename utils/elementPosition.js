export default function getElementPositionY (element, offset = 0) {
  if (typeof window === 'undefined') return 0;
  const box = element.getBoundingClientRect();
  const body = document.body;
  const docElem = document.documentElement;
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  const clientTop = docElem.clientTop || body.clientTop || 0;
  return (box.top + scrollTop) - clientTop - offset;
}

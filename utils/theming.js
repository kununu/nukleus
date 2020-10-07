const theming = theme => (...names) => names
  .map(name => theme[name] || name)
  .filter(x => x)
  .join(' ');

export default theming;

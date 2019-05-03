export default theme => {
  return (...names) => names
  .map(name => theme[name] || name)
  .filter(x => x)
  .join(" ");
}
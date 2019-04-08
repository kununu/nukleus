export default theme => {
  return (...names) => names
  .map(name => theme[name])
  .filter(x => x)
  .join(" ");
}
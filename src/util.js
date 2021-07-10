export function decimalRound(value, x = 100) {
  return Math.round(value * x) / x;
}
export function decimalFloor(value, x = 100) {
  return Math.floor(value * x) / x;
}
export function getRandomInRange(a: number, b: number) {
  const randomDecimal = Math.random();

  return a + Math.floor(randomDecimal * (b - a));
}

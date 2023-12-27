export const getRandomSeed = (seedMax = 1000000) => {
  return Math.floor(Math.random() * seedMax) + 1;
};

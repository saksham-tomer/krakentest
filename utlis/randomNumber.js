export const randomNumber = (low, high) => {
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

function getRandomCoords() {
  const firstCoord = getRandomInt(0, 10);
  const secondCoord = getRandomInt(0, 10);

  return [firstCoord, secondCoord];
}

function getRandomNum() {
  const num = getRandomInt(0, 2);
  return num;
}

export { getRandomCoords, getRandomNum };

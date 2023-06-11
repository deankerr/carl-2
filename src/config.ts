const tileSize = 16
const gameWidth = 69
const gameHeight = 39
const marginPx = 8

export const config = {
  tileSize,
  gameWidth,
  gameHeight,
  marginPx,
  appWidth: gameWidth * tileSize + marginPx,
  appHeight: gameHeight * tileSize + marginPx
}

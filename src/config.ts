const tileSize = 8
const gameWidth = 50
const gameHeight = 25
const marginPx = 8

export const config = {
  tileSize,
  gameWidth,
  gameHeight,
  marginPx,
  appWidth: gameWidth * tileSize + marginPx,
  appHeight: gameHeight * tileSize + marginPx
}

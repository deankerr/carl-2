const tileSize = 16
const gameWidth = 59
const gameHeight = 39
const paddingPx = 8

export const config = {
  tileSize,
  gameWidth,
  gameHeight,
  paddingPx,
  appWidth: gameWidth * tileSize + paddingPx,
  appHeight: gameHeight * tileSize + paddingPx,
}

const tileSizePx = 16
const viewportWidthCells = 59
const viewportHeightCells = 31
// const viewportWidthCells = 15
// const viewportHeightCells = 15
const paddingPx = 0

export const config = {
  seed: 'tommy',

  tileSizePx,

  viewportWidthCells,
  viewportHeightCells,

  paddingPx,

  pixiAppWidth: viewportWidthCells * tileSizePx + paddingPx,
  pixiAppHeight: viewportHeightCells * tileSizePx + paddingPx,

  overworldWidth: 100,
  overworldHeight: 100,

  playerSpawnPosition: {
    x: viewportWidthCells >> 1,
    y: viewportHeightCells >> 1,
  },

  enableFilters: true,
}

const tileSizePx = 16
const viewportWidthCells = 59
const viewportHeightCells = 31
const paddingPx = 0

export const config = {
  seed: 'tommy',
  enableDemoFilters: false,
  showDebugUI: false,
  playerSpawnPosition: {
    x: viewportWidthCells >> 1,
    y: viewportHeightCells >> 1,
  },

  tileSizePx,

  viewportWidthCells,
  viewportHeightCells,

  paddingPx,

  pixiAppWidth: viewportWidthCells * tileSizePx + paddingPx,
  pixiAppHeight: viewportHeightCells * tileSizePx + paddingPx,

  overworldWidth: 100,
  overworldHeight: 100,
}

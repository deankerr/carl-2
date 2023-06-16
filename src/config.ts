const tileSizePx = 16
const viewportWidthCells = 59
const viewportHeightCells = 31

export const config = {
  seed: 'tommy',
  enableDemoFilters: false,
  showDebugUI: true,
  playerSpawnPosition: {
    x: viewportWidthCells >> 1,
    y: viewportHeightCells >> 1,
  },

  tileSizePx,

  viewportWidthCells,
  viewportHeightCells,

  pixiAppWidth: viewportWidthCells * tileSizePx,
  pixiAppHeight: viewportHeightCells * tileSizePx,

  overworldWidth: 100,
  overworldHeight: 100,
}

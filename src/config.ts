const tileSizePx = 16
const viewportWidthCells = 59
const viewportHeightCells = 39
const paddingPx = 0

export const config = {
  tileSizePx,
  viewportWidthCells,
  viewportHeightCells,
  paddingPx,
  pixiAppWidth: viewportWidthCells * tileSizePx + paddingPx,
  pixiAppHeight: viewportHeightCells * tileSizePx + paddingPx,
  overworldWidth: 100,
  overworldHeight: 100,
}

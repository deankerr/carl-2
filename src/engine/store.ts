import { makeStore } from 'statery'

import { config } from '@/config'

export const store = makeStore({
  viewport: {
    x: 0,
    y: 0,
    width: config.viewportWidthCells,
    height: config.viewportHeightCells,
  },
  stats: {
    fps: 0,
    spritesTotal: 0,
    spritesRendered: 0,
  },
})

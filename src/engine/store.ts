import { makeStore } from 'statery'

import { config } from '@/config'

export const store = makeStore({
  viewport: {
    x: 0,
    y: 0,
    width: config.viewportWidth,
    height: config.viewportHeight,
  },
  stats: {
    fps: 0,
    spritesTotal: 0,
    spritesRendered: 0,
    worldSize: 0,
  },
  playerPosition: {
    x: 0,
    y: 0,
  },
})

import { World } from 'miniplex'
import { makeStore } from 'statery'

import { app } from '@/.'
import { config } from 'config'
import { Entity, createEntityFactory } from './entity'
import { createInput } from './input'
import { createOutdoors } from './region'
import { createSpriteSystem } from './system/spriteSystem'

type System = () => void

export function createEngine() {
  console.log('create engine')

  // Entities
  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  // temp - needed before turn scheduler implemented
  const player = createEntity('player', 30, 15)

  // Main update loop
  const update = (tempAction: string) => {
    // console.log('update', tempAction)
    switch (tempAction) {
      case 'pc left':
        player.position.x--
        break
      case 'pc right':
        player.position.x++
        break
      case 'pc up':
        player.position.y--
        break
      case 'pc down':
        player.position.y++
    }
  }
  createInput(update)

  const systems: System[] = []

  const store = makeStore({
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

  const init = () => {
    // Systems
    // systems.push(renderSystem)
    const renderSystem = createSpriteSystem()
    const t = performance.now()
    renderSystem()
    console.log('Initial render:', performance.now() - t)
    app.ticker.add(renderSystem)

    createOutdoors()
    // createOcean()
  }

  // FPS counter
  setInterval(() => {
    store.set((state) => ({
      stats: {
        ...state.stats,
        fps: Math.floor(app.ticker.FPS),
      },
    }))
  }, 250)

  return { init, createEntity, update, world, systems, player, store }
}

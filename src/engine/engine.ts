import { World } from 'miniplex'
import { makeStore } from 'statery'

import { Entity, createEntityFactory } from './entity'
import { createInput } from './input'
import { createOutdoors } from './region'
import { createFilterSystem } from './system/filterSystem'
import { createSpriteSystem } from './system/spriteSystem'
import { app, config } from '@/.'

type System = (dt: number) => void

const { playerSpawnPosition: pc } = config

export function createEngine() {
  // Entities
  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  // temp - needed before turn scheduler implemented
  const player = createEntity('player', pc.x, pc.y)

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

  const systems: System[] = []

  const init = () => {
    // Systems
    systems.push(createSpriteSystem())
    systems.push(createFilterSystem())

    // Overworld
    createOutdoors()
  }

  // Systems loop
  const run = (dt: number) => {
    for (const system of systems) {
      system(dt)
    }
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

  return { init, createEntity, update, run, world, systems, player, store }
}

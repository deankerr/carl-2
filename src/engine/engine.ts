import { World } from 'miniplex'
import { makeStore } from 'statery'

import { app } from '@/.'
import { config } from 'config'
import { Entity, createEntityFactory } from './entity'
import { createInput } from './input'
import { createOutdoors } from './region'
import { createRenderSystem } from './system/render'

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
    log: {
      fps: 0,
      spritesTotal: 0,
      spritesRendered: 0,
    },
  })

  const init = () => {
    // Systems
    const renderSystem = createRenderSystem()
    systems.push(renderSystem)

    createOutdoors()
    app.ticker.add(renderSystem)
  }

  return { init, createEntity, update, world, systems, player, store }
}

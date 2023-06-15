import { World } from 'miniplex'

import { Entity, createEntityFactory } from './entity'
import { bindInput } from './input'
import { createOutdoors } from './region'
import { store } from './store'
import { createFilterSystem } from './system/filterSystem'
import { createSpriteSystem } from './system/spriteSystem'
import { app, config } from '@/.'

const { playerSpawnPosition: pc } = config

export function createEngine() {
  console.log('create engine')
  // Entities
  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  // temp - needed before turn scheduler implemented
  const player = createEntity('player', pc.x, pc.y)

  // Game turn update loop
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
  bindInput(update)

  const init = () => {
    console.log('init')
    // Systems
    const systems = [createSpriteSystem(), createFilterSystem()]

    const runSystems = (dt: number) => {
      for (const system of systems) {
        system(dt)
      }
    }
    app.ticker.add(runSystems)

    // Overworld
    createOutdoors()

    // FPS counter
    setInterval(() => {
      store.set((state) => ({
        stats: {
          ...state.stats,
          fps: Math.floor(app.ticker.FPS),
        },
      }))
    }, 250)
  }

  return { init, createEntity, world, player }
}

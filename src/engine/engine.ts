import { bindInput, config, create, createOutdoors, store, world } from '@'
import { app } from '@lib'

import {
  createFilterSystem,
  spriteCreationSystem,
  spriteUpdateSystem,
} from './system'

function createEngine() {
  console.log('create engine')

  const init = () => {
    //* Create overworld
    createOutdoors()

    //* temp - needed before turn scheduler implemented
    const player = create(
      'player',
      config.viewportWidth >> 1,
      config.viewportHeight >> 1
    )

    const handleInput = (tempAction: string) => {
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
      store.set(() => ({
        playerPosition: { ...player.position },
      }))
    }

    bindInput(handleInput)

    //* Systems
    const systems = [
      spriteCreationSystem(),
      spriteUpdateSystem(),
      createFilterSystem(),
    ]

    const runSystems = (dt: number) => {
      for (const system of systems) {
        if (system) system(dt)
      }
    }

    app.ticker.add(runSystems)
  }

  return { init }
}

export const engine = createEngine()

//* update debug ui stats
setInterval(() => {
  store.set((state) => ({
    stats: {
      ...state.stats,
      fps: Math.floor(app.ticker.FPS),
      worldSize: world.size,
    },
  }))
}, 250)

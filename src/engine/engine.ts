import { create, world } from './entity'
import { bindInput } from './input'
import { createOutdoors } from './region'
import { store } from './store'
import { createFilterSystem } from './system/filterSystem'
import { spriteCreationSystem } from './system/spriteCreationSystem'
import { spriteUpdateSystem } from './system/spriteUpdateSystem'
import { app, config } from '@/.'

const { playerSpawnPosition: pc } = config

export function createEngine() {
  console.log('create engine')

  // temp - needed before turn scheduler implemented
  const player = create('player', pc.x, pc.y)

  // Game turn update loop
  const update = (tempAction: string) => {
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
  bindInput(update)

  const init = () => {
    console.log('init')

    // Systems
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

    // Overworld
    createOutdoors()
    // createOcean()
  }

  return { init, create }
}

// update debug ui stats
setInterval(() => {
  store.set((state) => ({
    stats: {
      ...state.stats,
      fps: Math.floor(app.ticker.FPS),
      worldSize: world.size,
    },
  }))
}, 250)

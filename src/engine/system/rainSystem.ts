import { create, store, world } from '@'
import { rng } from '@lib'

const dropletAmount = 40
const dropTime = 16
const splashTime = 200

export function rainSystem() {
  const rainEntities = world.with('rain')

  //* create droplet pool
  while (rainEntities.size < dropletAmount) {
    const droplet = create('raindrop', 0, 0)
    world.addComponent(droplet, 'rain', {
      state: 'falling',
      ttl: 0,
      timestamp: 0,
    })
  }

  return () => {
    for (const droplet of rainEntities) {
      if (Date.now() > droplet.rain.timestamp) {
        //* rain splashing
        if (
          droplet.rain.state === 'splash' &&
          Date.now() > droplet.rain.timestamp
        ) {
          // TODO handle in a cleanup system
          droplet._sprite?.container.destroy({ children: true })
          world.remove(droplet)
          store.set((state) => ({
            stats: {
              ...state.stats,
              spritesTotal: state.stats.spritesTotal - 1,
            },
          }))
        }

        //* falling rain
        if (droplet.rain.state === 'falling') {
          if (droplet.rain.ttl === 0) {
            //* create splash
            const splash = create(
              'raindropSplash',
              droplet.position.x,
              droplet.position.y
            )
            world.addComponent(splash, 'rain', {
              state: 'splash',
              ttl: 0,
              timestamp: Date.now() + splashTime,
            })

            //* restart fall
            const { viewport } = store.state
            droplet.position.x = rng.int(
              viewport.x,
              viewport.x + viewport.width
            )
            droplet.position.y = viewport.y

            droplet.rain.ttl = rng.int(1, viewport.height)
            droplet.rain.timestamp = Date.now() + dropTime
          }
          //* move droplet
          if (Date.now() > droplet.rain.timestamp) {
            droplet.position.y++
            droplet.rain.ttl--
            droplet.rain.timestamp = Date.now() + dropTime
          }
        }
      }
    }
  }
}

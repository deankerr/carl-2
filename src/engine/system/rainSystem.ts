import { create, store, world } from '@'
import { rng } from '@lib'

const dropletAmount = 10
const dropTime = 500
const dropTTL = 10
const yStartRange = 5

export function rainSystem() {
  const rainEntities = world.with('rain')

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
        if (droplet.rain.state === 'falling') {
          if (droplet.rain.ttl === 0) {
            //* restart fall
            const { viewport } = store.state
            const x = rng.int(viewport.x, viewport.x + viewport.width)
            const y = rng.int(viewport.y, viewport.y - yStartRange) // ?
            droplet.position.x = x
            droplet.position.y = y
            droplet.rain.ttl = rng.int(1, viewport.height)
            droplet.rain.timestamp = Date.now() + dropTime
          } else {
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
}

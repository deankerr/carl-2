import { config } from 'config'
import { World } from 'miniplex'
import { Entity } from './entity'

export type Region = {
  entities: Entity[]
}

export function createTestRegion(
  world: World<Entity>,
  callback: (x: number, y: number) => unknown
) {
  for (let yi = 0; yi < config.gameHeight; yi++) {
    for (let xi = 0; xi < config.gameWidth; xi++) {
      callback(xi, yi)
    }
  }
}

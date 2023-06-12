import { config } from 'config'
import { World } from 'miniplex'
import { engine } from '../'
import { Entity, EntityKey } from './entity'
import { pick } from './util'

const { gameWidth, gameHeight } = config

export type Region = {
  entities: Entity[]
}

export function createTestRegion(
  world: World<Entity>,
  callback: (x: number, y: number) => unknown
) {
  for (let yi = 0; yi < gameHeight; yi++) {
    for (let xi = 0; xi < gameWidth; xi++) {
      callback(xi, yi)
    }
  }
}

export function createOutdoors() {
  spawnEachCellChance({
    tree: 1,
    deadTree: 1,
    deadGrass: 4,
    shrub: 2,
    grass: 5,
    flowers: 1,
    nothing: 2
  })
}

function spawnEachCellChance(keys: Partial<Record<EntityKey, number>>) {
  const list: EntityKey[] = []
  for (const [value, amount] of Object.entries(keys)) {
    for (let i = 0; i < amount; i++) {
      list.push(value as EntityKey)
    }
  }

  for (let yi = 0; yi < gameHeight; yi++) {
    for (let xi = 0; xi < gameWidth; xi++) {
      const key = pick(list)
      if (key !== 'nothing') engine.createEntity(key, xi, yi)
    }
  }
}

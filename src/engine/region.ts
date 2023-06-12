import { config } from 'config'
import { engine } from '../'
import { Entity, EntityKey } from './entity'
import { pick } from './util'

const { gameWidth, gameHeight } = config

export type Region = {
  entities: Entity[]
}

export function createOutdoors() {
  spawnEachCellChance({
    grass: 5,
    deadGrass: 4,
    nothing: 3,
    shrub: 2,
    plant: 2,
    tree: 1,
    deadTree: 1,
    flowers: 1,
    hill: 1,
    rocks: 1,
    mushroom: 1,
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

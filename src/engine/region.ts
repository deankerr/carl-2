import { engine } from '@/.'
import { config } from 'config'
import { Entity, EntityKey } from './entity'
import { pick } from './util'

const { overworldWidth, overworldHeight } = config

export type Region = {
  entities: Entity[]
}

export function createOutdoors() {
  spawnEachCellChance({
    grass: 20,
    nothing: 3,
    deadGrass: 5,
    shrub: 1,
    plant: 1,
    tree: 1,
    deadTree: 1,
    flowers: 1,
    hill: 1,
    rocks: 1,
    mushroom: 1,
  })

  const lake = { x: 35, y: 10, x2: 55, y2: 20 }

  for (let yi = lake.y; yi < lake.y2; yi++) {
    for (let xi = lake.x; xi < lake.x2; xi++) {
      engine.createEntity('water', xi, yi)
    }
  }
}

export function createOcean() {
  spawnEachCellChance({ water: 1 })
}

function spawnEachCellChance(keys: Partial<Record<EntityKey, number>>) {
  const list: EntityKey[] = []
  for (const [value, amount] of Object.entries(keys)) {
    for (let i = 0; i < amount; i++) {
      list.push(value as EntityKey)
    }
  }

  for (let yi = 0; yi < overworldHeight; yi++) {
    for (let xi = 0; xi < overworldWidth; xi++) {
      const key = pick(list)
      if (key !== 'nothing') engine.createEntity(key, xi, yi)
    }
  }
}

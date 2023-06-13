import { engine } from '@/.'
import { config } from 'config'
import { Entity, EntityKey } from './entity'
import { rng } from '@/lib/rng'

const { overworldWidth, overworldHeight } = config

export type Region = {
  entities: Entity[]
}

export function createOutdoors() {
  spawnEachCellChance({
    grass: 20,
    // nothing: 3,
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

  createLake('waterA', 9, 9, 8, 8)
  createLake('waterA', 11, 11, 8, 8)

  createLake('waterC', 40, 30, 8, 8)
  createLake('waterC', 42, 32, 8, 8)
}

export function createOcean() {
  spawnEachCellChance({ waterA: 1 })
}

function createLake(
  key: EntityKey,
  x: number,
  y: number,
  w: number,
  h: number
) {
  for (let yi = y; yi < y + h; yi++) {
    for (let xi = x; xi < x + w; xi++) {
      engine.createEntity(key, xi, yi)
    }
  }
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
      const key = rng.pick(list)
      engine.createEntity(key, xi, yi)
    }
  }
}

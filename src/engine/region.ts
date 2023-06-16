import { Entity, EntityKey, create } from './entity'
import { config } from '@/.'
import { rng } from '@/lib/rng'

const { overworldWidth, overworldHeight } = config

export type Region = {
  entities: Entity[]
}

export function createOutdoors() {
  spawnEachCellChance({
    grass: 20,
    nothing: 8,
    deadGrass: 5,
    shrub: 1,
    plant: 1,
    tree: 1,
    deadTree: 1,
    flowers: 1,
    // hill: 1,
    // rocks: 1,
    mushroom: 1,
  })

  rectangle('waterA', 9, 10, 5, 5)
  rectangle('waterA', 11, 11, 5, 5)

  rectangle('waterC', 40, 31, 5, 5)
  rectangle('waterC', 42, 32, 5, 5)
}

export function createOcean() {
  spawnEachCellChance({ waterA: 1 })
}

function rectangle(key: EntityKey, x: number, y: number, w: number, h: number) {
  for (let yi = y; yi < y + h; yi++) {
    for (let xi = x; xi < x + w; xi++) {
      create(key, xi, yi)
    }
  }
}

function spawnEachCellChance(
  keys: Partial<Record<EntityKey | 'nothing', number>>
) {
  const list: (EntityKey | 'nothing')[] = []
  for (const [value, amount] of Object.entries(keys)) {
    for (let i = 0; i < amount; i++) {
      list.push(value as EntityKey)
    }
  }

  for (let yi = 0; yi < overworldHeight; yi++) {
    for (let xi = 0; xi < overworldWidth; xi++) {
      const key = rng.pick(list)
      if (key !== 'nothing') {
        create(key, xi, yi)
      }
    }
  }
}

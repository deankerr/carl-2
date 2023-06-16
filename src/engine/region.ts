import { Entity, EntityKey, create } from './entity'
import { config } from '@/.'
import { rng } from '@/lib/rng'

const { overworldWidth, overworldHeight } = config

export type Region = {
  entities: Entity[]
}

type Point = [number, number]

export function createOutdoors() {
  spawnEachCellChance({
    grass: 20,
    nothing: 5,
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

  lake('waterA', [10, 8], 4)
  lake('waterA', [48, 22], 4)
}

export function createOcean() {
  spawnEachCellChance({ waterB: 1 })
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

export function rectangle(
  key: EntityKey,
  x: number,
  y: number,
  w: number,
  h: number
) {
  for (let yi = y; yi < y + h; yi++) {
    for (let xi = x; xi < x + w; xi++) {
      create(key, xi, yi)
    }
  }
}

function circle(key: EntityKey, center: Point, radius: number) {
  // https://www.redblobgames.com/grids/circle-drawing/
  const top = Math.ceil(center[1] - radius)
  const bottom = Math.floor(center[1] + radius)

  for (let y = top; y <= bottom; y++) {
    const dy = y - center[1]
    const dx = Math.sqrt(radius * radius - dy * dy)
    const left = Math.ceil(center[0] - dx)
    const right = Math.floor(center[0] + dx)

    for (let x = left; x <= right; x++) {
      create(key, x, y)
    }
  }
}

function lake(key: EntityKey, center: Point, size: number) {
  const x = rng.int(2, 3) * rng.pick([-1, 1])
  const y = rng.int(0, 1) * rng.pick([-1, 1])
  const center2: Point = [center[0] + x, center[1] + y]

  circle(key, center, size)
  circle(key, center2, size + rng.pick([-1, 1]))
}

import { Entity, EntityKey, config, create } from '@'
import { rng } from '@lib'

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

  create('woodWallTL', 30, 12)

  create('woodWallT', 31, 12)
  create('woodWallT', 32, 12)
  create('woodWallT', 33, 12)
  create('woodWallT', 34, 12)
  create('woodWallT', 35, 12)

  create('woodWallTR', 36, 12)

  create('woodWallLR', 30, 13)
  create('woodWallLR', 30, 14)
  create('woodWallLR', 30, 15)
  create('woodWallLR', 30, 16)
  create('woodWallLR', 30, 17)

  create('woodWallLR', 36, 13)
  create('woodWallLR', 36, 14)
  create('woodWallLR', 36, 15)
  create('woodWallLR', 36, 16)
  create('woodWallLR', 36, 17)

  create('woodWallL', 30, 18)
  create('woodWallR', 36, 18)

  create('woodWallT', 31, 18)
  create('woodWallT', 32, 18)
  create('door', 33, 18)
  create('woodWallT', 34, 18)
  create('woodWallT', 35, 18)
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

export function hollowRectangle(
  key: EntityKey,
  x: number,
  y: number,
  w: number,
  h: number
) {
  for (let yi = y; yi < y + h; yi++) {
    for (let xi = x; xi < x + w; xi++) {
      if (yi === y || yi === y + h - 1 || xi === x || xi === x + w - 1)
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

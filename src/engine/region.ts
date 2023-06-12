import { engine } from '@/.'
import { config } from 'config'
import { Entity, EntityKey } from './entity'
import { pick } from './util'

const { viewportWidthCells, viewportHeightCells } = config

export type Region = {
  entities: Entity[]
}

export function createOutdoors() {
  spawnEachCellChance({
    grass: 10,
    nothing: 3,
    deadGrass: 2,
    shrub: 1,
    plant: 1,
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

  for (let yi = 0; yi < viewportHeightCells; yi++) {
    for (let xi = 0; xi < viewportWidthCells; xi++) {
      const key = pick(list)
      if (key !== 'nothing') engine.createEntity(key, xi, yi)
    }
  }
}

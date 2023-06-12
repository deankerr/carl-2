import { config } from 'config'
import { World } from 'miniplex'
import { engine } from '../'
import { Entity, EntityKey } from './entity'
import { pick, random } from './util'

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
  // const spawnTrees = 50
  // const spawnGrass = 400
  // const spawnDeadGrass = 400

  // for (let i = 0; i < spawnTrees; i++) {
  //   engine.createEntity('deadTree', random(0, gameWidth), random(0, gameHeight))
  // }

  // for (let i = 0; i < spawnGrass; i++) {
  //   engine.createEntity('grass', random(0, gameWidth), random(0, gameHeight))
  // }

  // for (let i = 0; i < spawnDeadGrass; i++) {
  //   engine.createEntity(
  //     'deadGrass',
  //     random(0, gameWidth),
  //     random(0, gameHeight)
  //   )
  // }

  // spawn('grass2', 400)
  // spawn('grass1', 400)
  // spawnEachCell([
  //   'tree',
  //   'deadTree',
  //   'grass1',
  //   'grass2',
  //   'deadGrass',
  //   'deadGrass2',
  //   'grass3',
  //   'grass4',
  //   'shrub',
  //   'flowersPurple1',
  //   'flowersPurple2',
  //   'flowersYellow1',
  //   'flowersYellow2'
  // ])

  spawnEachCellChance({
    tree: 1,
    deadTree: 1,
    grass1: 3,
    grass2: 3,
    deadGrass: 3,
    deadGrass2: 3,
    grass3: 3,
    grass4: 3,
    shrub: 2,
    flowersPurple1: 1,
    flowersPurple2: 1,
    flowersYellow1: 1,
    flowersYellow2: 1
  })
}

function spawn(key: EntityKey, amount: number) {
  for (let i = 0; i < amount; i++) {
    engine.createEntity(key, random(0, gameWidth), random(0, gameHeight))
  }
}

function spawnEachCell(keys: EntityKey[]) {
  for (let yi = 0; yi < gameHeight; yi++) {
    for (let xi = 0; xi < gameWidth; xi++) {
      engine.createEntity(pick(keys), xi, yi)
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

  console.log(list)

  for (let yi = 0; yi < gameHeight; yi++) {
    for (let xi = 0; xi < gameWidth; xi++) {
      engine.createEntity(pick(list), xi, yi)
    }
  }
}

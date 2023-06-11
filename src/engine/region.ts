import { config } from 'config'
import { World } from 'miniplex'
import { engine } from '../'
import { Entity } from './entity'
import { random } from './util'

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
  const spawnTrees = 50
  const spawnGrass = 200
  const spawnDeadGrass = 200

  for (let i = 0; i < spawnTrees; i++) {
    engine.createEntity('deadTree', random(0, gameWidth), random(0, gameHeight))
  }

  for (let i = 0; i < spawnGrass; i++) {
    engine.createEntity('grass', random(0, gameWidth), random(0, gameHeight))
  }

  for (let i = 0; i < spawnDeadGrass; i++) {
    engine.createEntity(
      'deadGrass',
      random(0, gameWidth),
      random(0, gameHeight)
    )
  }
}

import { World } from 'miniplex'

export type Entity = {
  id: number // ?
  base: string // ? keyof template

  // Components

  // ? temp
  glyph: {
    char: string // ? keyof spritesheet ids
    color: string // ? future HSL Color object
    bgColor: string // ? ^
  }

  position: {
    x: number // grid reference
    y: number
  }
}

export const entityTemplates = {
  player: {
    glyph: {
      char: 'pc',
      color: 'rgb(0, 128, 128)',
      bgColor: 'black'
    }
  }
}

export function createEntityFactory(world: World<Entity>) {
  let entityCount = 0 // TODO move to state

  const create = (
    key: keyof typeof entityTemplates,
    x: number,
    y: number
  ): Entity => {
    const entity = {
      id: entityCount++,
      base: key,

      ...entityTemplates[key],

      position: { x, y }
    }

    world.add(entity)
    return entity
  }

  return create
}

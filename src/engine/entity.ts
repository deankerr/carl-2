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
    zIndex: number //? replace with entity catagories
  }

  position: {
    x: number // grid reference
    y: number
  }

  solid?: true // blocks movement
}

export const entityTemplates = {
  player: {
    glyph: {
      char: '@',
      color: 'rgb(140, 237, 39)',
      bgColor: 'black',
      zIndex: 3
    }
  },
  wall: {
    glyph: {
      char: 'wall',
      color: 'rgb(118, 118, 118)',
      bgColor: 'black',
      zIndex: 1
    },
    solid: true
  },
  path: {
    glyph: {
      char: 'path',
      color: 'rgb(38, 38, 38)',
      bgColor: 'black',
      zIndex: 1
    }
  }
} satisfies Record<string, Partial<Omit<Entity, 'id' | 'base'>>>

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

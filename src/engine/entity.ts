import { World } from 'miniplex'
import { Sprite } from 'pixi.js'
import { entityTemplates } from './templates'
import { pick } from './util'

export type Entity = {
  id: number // ?
  base: string // ? keyof template

  glyph: EntityGlyph

  // Components
  position: {
    x: number // grid reference
    y: number
  }

  sprite?: Sprite
} & Partial<EntityFlags>

export type EntityGlyph = {
  char: string // ? keyof spritesheet ids
  color: string // ? future HSL Color object
  // bgColor?: string // ? ^
  zIndex: number //? replace with entity catagories + pixi containers
}

export type EntityFlags = {
  isPlayer?: true
  solid?: true // blocks movement
}

export type EntityKey = keyof typeof entityTemplates | 'nothing'

export function createEntityFactory(world: World<Entity>) {
  let entityCount = 0 // TODO move to state

  const create = (
    key: keyof typeof entityTemplates,
    x: number,
    y: number
  ): Entity => {
    const { char, color, zIndex, ...flags } = entityTemplates[key]

    const entity = {
      id: entityCount++,
      base: key,

      glyph: {
        char: typeof char === 'string' ? char : pick(char),
        color: typeof color === 'string' ? color : pick(color),
        zIndex,
      },

      position: { x, y },

      ...flags,
    }

    world.add(entity)
    return entity
  }

  return create
}

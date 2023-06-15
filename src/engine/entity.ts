import { World } from 'miniplex'
import { AnimatedSprite, Container, Sprite } from 'pixi.js'

import { entityTemplates } from './templates'

export type Entity = {
  id: number // ?
  base: EntityTemplate

  // base sprite overrides
  sprite?: string
  tint?: string
  bgTint?: string

  // Components
  position: {
    x: number // grid reference
    y: number
  }

  _sprite?: {
    container: Container
    background?: Sprite | AnimatedSprite
    foreground: Sprite | AnimatedSprite
  }
} & Partial<Record<Tag, true>>

export type Tag = 'isPlayer' | 'solid' | 'isGrass'

export type EntityKey = keyof typeof entityTemplates
type EntityTemplate = (typeof entityTemplates)[EntityKey]

function createTags(template: EntityTemplate) {
  if (!('tags' in template)) return {}

  const tags: Partial<Record<Tag, true>> = {}

  for (const tag of template.tags) {
    tags[tag] = true
  }

  return tags
}

let nextEntityID = 0
export function create(key: EntityKey, x: number, y: number): Entity {
  const template = entityTemplates[key]

  const entity = {
    id: nextEntityID++,
    base: entityTemplates[key],

    position: { x, y },
    ...createTags(template),
  }

  world.add(entity)
  return entity
}

export const world = new World<Entity>()

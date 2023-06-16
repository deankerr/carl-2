import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js'

import { Entity, world } from '../entity'
import { store } from '../store'
import { app } from '@/lib/pixi'
import { rng } from '@/lib/rng'

// TODO Refactor - completely rethink sprite creation/definitions
// ? standardise sprite containers to [bg, fg] - bg visible = null if not needed

export function spriteCreationSystem() {
  const spritelessEntities = world.with('position').without('_sprite')

  // sprite z level layers
  const layers = createLayers()

  return () => {
    //* create sprite for new entities
    let spritesCreated = 0
    for (const entity of spritelessEntities) {
      // For the sprite, tint and background tint sprite, pick a random sprite if
      // necessary and apply the selections to the entity as components
      let spriteID = ''
      let tint = ''
      let bgTint = '' // optional

      // ? move this gnarly component adding logic to Entity factory
      if (!entity.sprite) {
        if (Array.isArray(entity.base.sprite)) {
          spriteID = rng.pick(entity.base.sprite)
          world.addComponent(entity, 'sprite', spriteID)
        } else {
          spriteID = entity.base.sprite
        }
      }

      if (!entity.tint) {
        if (Array.isArray(entity.base.tint)) {
          tint = rng.pick(entity.base.tint)
          world.addComponent(entity, 'tint', tint)
        } else {
          tint = entity.base.tint
        }
      }

      if (!entity.bgTint) {
        if ('bgTint' in entity.base) {
          // type issue, bgTint can't be an array yet
          // TODO fix in refactor

          // if (Array.isArray(entity.base.bgTint)) {
          //   bgTint = rng.pick(entity.base.bgTint)
          //   world.addComponent(entity, 'bgTint', bgTint)
          // } else {
          //   bgTint = entity.base.bgTint
          // }
          bgTint = entity.base.bgTint
        }
      }

      const container = new Container()

      let background: Sprite | undefined
      if (bgTint) {
        background = Sprite.from(Texture.WHITE)
        background.tint = bgTint
        container.addChild(background)
      }

      let foreground: Sprite | AnimatedSprite

      if ('animate' in entity.base && Array.isArray(entity.base.sprite)) {
        // create animated sprite
        const textures = entity.base.sprite.map((sprite) =>
          Texture.from(sprite)
        )

        const sprite = new AnimatedSprite(textures)
        sprite.animationSpeed = (1 / 60 / 1000) * entity.base.animate
        sprite.play()

        foreground = sprite
      } else {
        // regular sprite
        foreground = Sprite.from(spriteID)
      }
      foreground.tint = tint
      container.addChild(foreground)

      container.visible = false

      //* add to stage
      const layer = 'layer' in entity.base ? entity.base.layer : 0
      layers.add(container, layer)

      //* add sprite component to entity
      const _sprite: Entity['_sprite'] = { container, foreground }
      if (background) _sprite.background = background

      world.addComponent(entity, '_sprite', _sprite)
      spritesCreated++
    }

    store.set((state) => ({
      stats: {
        ...state.stats,
        spritesTotal: state.stats.spritesTotal + spritesCreated,
      },
    }))
  }
}

function createLayers() {
  const layers: Container[] = []

  const add = (sprite: Container, layer = 0) => {
    if (!layers[layer]) {
      const container = new Container()
      layers[layer] = container

      app.stage.removeChildren()
      app.stage.addChild(...layers.filter((l) => l !== undefined))
    }

    layers[layer].addChild(sprite)
  }

  return { layers, add }
}

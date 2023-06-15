import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js'

import { Entity, world } from '../entity'
import { store } from '../store'
import { app, config } from '@/.'
import { rng } from '@/lib/rng'

type Viewport = typeof store.state.viewport
type Position = { x: number; y: number }

export function createSpriteSystem() {
  // queries
  const spritelessEntities = world.with('position').without('_sprite')
  const spriteEntities = world.with('position', '_sprite')
  const [player] = world.with('position', 'isPlayer')

  return () => {
    // update viewport location
    const viewport = { ...store.state.viewport }
    const anchor = player ? player.position : { x: 0, y: 0 }

    viewport.x = anchor.x - Math.floor(viewport.width / 2)
    viewport.y = anchor.y - Math.floor(viewport.height / 2)

    // create sprite for new entities
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

      const { x, y } = calculateScreenPosition(viewport, entity.position)
      container.position.set(x, y)
      container.zIndex = 'zIndex' in entity.base ? entity.base.zIndex : 1

      app.stage.addChild(container)

      const _sprite: Entity['_sprite'] = { container, foreground }
      if (background) _sprite.background = background

      world.addComponent(entity, '_sprite', _sprite)
      spritesCreated++
    }

    // update sprites
    // TODO only update if necessary
    let spritesRendered = 0
    for (const entity of spriteEntities) {
      const { x, y } = calculateScreenPosition(viewport, entity.position)
      entity._sprite.container.position.set(x, y)

      if (shouldRenderSprite(viewport, entity.position)) {
        entity._sprite.container.visible = true
        spritesRendered++
      } else {
        entity._sprite.container.visible = false
      }
    }

    // update log
    store.set((state) => ({
      viewport,
      stats: {
        ...state.stats,
        spritesTotal: state.stats.spritesTotal + spritesCreated,
        spritesRendered,
      },
    }))
  }
}

function calculateScreenPosition(viewport: Viewport, position: Position) {
  const x =
    (position.x - viewport.x) * config.tileSizePx +
    Math.floor(config.paddingPx / 2)
  const y =
    (position.y - viewport.y) * config.tileSizePx +
    Math.floor(config.paddingPx / 2)

  return { x, y }
}

function shouldRenderSprite(viewport: Viewport, position: Position) {
  return (
    position.x >= viewport.x &&
    position.x <= viewport.x + viewport.width &&
    position.y >= viewport.y &&
    position.y <= viewport.y + viewport.height
  )
}

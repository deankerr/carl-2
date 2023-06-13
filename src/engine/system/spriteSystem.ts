import { app, engine } from '@/.'
import { config } from 'config'
import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js'
import { Entity } from '../entity'
import { pick } from '../util'

type Viewport = typeof engine.store.state.viewport
type Position = { x: number; y: number }

export function createSpriteSystem() {
  const { world, player, store } = engine

  // queries
  const spritelessEntities = world.with('position').without('_sprite')
  const spriteEntities = world.with('position', '_sprite')

  return () => {
    // update viewport location // ? move to end, set in one go?
    store.set((state) => ({
      viewport: {
        ...state.viewport,
        x: player.position.x - Math.floor(state.viewport.width / 2),
        y: player.position.y - Math.floor(state.viewport.height / 2),
      },
    }))

    const { viewport } = store.state

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
          spriteID = pick(entity.base.sprite)
          world.addComponent(entity, 'sprite', spriteID)
        } else {
          spriteID = entity.base.sprite
        }
      }

      if (!entity.tint) {
        if (Array.isArray(entity.base.tint)) {
          tint = pick(entity.base.tint)
          world.addComponent(entity, 'tint', tint)
        } else {
          tint = entity.base.tint
        }
      }

      if (!entity.bgTint) {
        if ('bgTint' in entity.base) {
          if (Array.isArray(entity.base.bgTint)) {
            bgTint = pick(entity.base.bgTint)
            world.addComponent(entity, 'bgTint', bgTint)
          } else {
            bgTint = entity.base.bgTint
          }
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

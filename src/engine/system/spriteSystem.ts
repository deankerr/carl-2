import { app, engine } from '@/.'
import { config } from 'config'
import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js'
import { Entity } from '../entity'

type Viewport = typeof engine.store.state.viewport
type Position = { x: number; y: number }

export function createSpriteSystem() {
  const { world, player, store } = engine

  // queries
  const spritelessEntities = world.with('position', 'glyph').without('_sprite')
  const spriteEntities = world.with('position', 'glyph', '_sprite')

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
      const container = new Container()

      const background: Sprite | undefined = undefined

      if (entity.glyph.bgColor) {
        const background = Sprite.from(Texture.WHITE)
        background.tint = entity.glyph.bgColor

        container.addChild(background)
      }

      let foreground: Sprite | AnimatedSprite

      if (entity.animatedSprite && Array.isArray(entity.base.char)) {
        const texture = entity.base.char.map((char) => Texture.from(char))

        const animatedSprite = new AnimatedSprite(texture)
        animatedSprite.animationSpeed = 0.0125
        animatedSprite.play()

        foreground = animatedSprite
      } else {
        foreground = Sprite.from(entity.glyph.char)
      }
      foreground.tint = entity.glyph.color
      container.addChild(foreground)

      const { x, y } = calculateScreenPosition(viewport, entity.position)
      container.position.set(x, y)
      container.zIndex = entity.glyph.zIndex

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
      log: {
        ...state.log,
        fps: Math.floor(app.ticker.FPS),
        spritesTotal: state.log.spritesTotal + spritesCreated,
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

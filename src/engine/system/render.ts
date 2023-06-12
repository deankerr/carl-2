import { app, engine } from '@/.'
import { config } from 'config'
import { AnimatedSprite, Sprite, Texture } from 'pixi.js'

type Viewport = typeof engine.store.state.viewport
type Position = { x: number; y: number }

export function createRenderSystem() {
  const { world, player, store } = engine

  // queries
  const spritelessEntities = world.with('position', 'glyph').without('sprite')
  const spriteEntities = world.with('position', 'glyph', 'sprite')

  return () => {
    // update viewport location
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
      let sprite: Sprite | AnimatedSprite

      if (entity.animatedSprite && Array.isArray(entity.base.char)) {
        const texture = entity.base.char.map((char) => Texture.from(char))

        const animatedSprite = new AnimatedSprite(texture)
        animatedSprite.animationSpeed = 0.0125
        animatedSprite.play()

        sprite = animatedSprite
      } else {
        sprite = Sprite.from(entity.glyph.char)
      }

      const { x, y } = calculateScreenPosition(viewport, entity.position)
      sprite.position.set(x, y)
      sprite.zIndex = entity.glyph.zIndex

      sprite.tint = entity.glyph.color

      world.addComponent(entity, 'sprite', sprite)
      app.stage.addChild(sprite)
      spritesCreated++
    }

    // update sprites
    // TODO only update if necessary
    let spritesRendered = 0
    for (const entity of spriteEntities) {
      const { x, y } = calculateScreenPosition(viewport, entity.position)
      entity.sprite.position.set(x, y)

      if (shouldRenderSprite(viewport, entity.position)) {
        entity.sprite.visible = true
        spritesRendered++
      } else {
        entity.sprite.visible = false
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

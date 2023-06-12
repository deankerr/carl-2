import { app, engine } from '@/.'
import { config } from 'config'
import { AnimatedSprite, Container, Sprite, Texture } from 'pixi.js'

type Viewport = typeof engine.store.state.viewport
type Position = { x: number; y: number }

export function createRenderSystem() {
  const { world, player, store } = engine

  // queries
  const spritelessEntities = world
    .with('position', 'glyph')
    .without('container')
  const spriteEntities = world.with('position', 'glyph', 'container', 'sprite')

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
      // TODO create single Sprite component, clean up
      console.log('CRAETE', entity.glyph)

      const container = new Container()
      world.addComponent(entity, 'container', container)

      console.log('entity.glyph.bgColor:', entity.glyph.bgColor)
      if (entity.glyph.bgColor) {
        const bgSprite = Sprite.from(Texture.WHITE)
        bgSprite.tint = entity.glyph.bgColor
        console.log('bgSprite:', bgSprite)

        world.addComponent(entity, 'bgSprite', bgSprite)
        container.addChild(bgSprite)
      }

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
      sprite.tint = entity.glyph.color
      world.addComponent(entity, 'sprite', sprite)

      container.addChild(sprite)

      const { x, y } = calculateScreenPosition(viewport, entity.position)
      container.position.set(x, y)
      container.zIndex = entity.glyph.zIndex

      app.stage.addChild(container)
      spritesCreated++
    }

    // update sprites
    // TODO only update if necessary
    let spritesRendered = 0
    for (const entity of spriteEntities) {
      const { x, y } = calculateScreenPosition(viewport, entity.position)
      entity.container.position.set(x, y)

      if (shouldRenderSprite(viewport, entity.position)) {
        entity.container.visible = true
        spritesRendered++
      } else {
        entity.container.visible = false
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

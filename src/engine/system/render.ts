import { engine } from '@/.'
import { config } from 'config'
import { Sprite } from 'pixi.js'

export function createRenderSystem() {
  const { app, world, player, store } = engine

  // queries
  const spritelessEntities = world.with('position', 'glyph').without('sprite')
  const spriteEntities = world.with('position', 'glyph', 'sprite')

  return () => {
    // update viewport location
    store.set((state) => ({
    testCurrentRegion: 'blah',
    viewport: {
      ...state.viewport,
      x: player.position.x - (Math.floor(state.viewport.width / 2)),
      y: player.position.y - (Math.floor(state.viewport.height / 2))
    }
    }))

    const { viewport } = store.state

    // create sprite for new entities
    for (const entity of spritelessEntities) {
      const sprite = Sprite.from(entity.glyph.char)

      const { x, y } = calculateScreenPosition(viewport, entity.position)
      sprite.position.set(x, y)
      sprite.zIndex = entity.glyph.zIndex

      sprite.tint = entity.glyph.color

      world.addComponent(entity, 'sprite', sprite)
      app.stage.addChild(sprite)
    }

    // update sprites
    // TODO only update if necessary
    for (const entity of spriteEntities) {
      const { x, y } = calculateScreenPosition(viewport, entity.position)
      entity.sprite.position.set(x, y)
    }
  }
}

function calculateScreenPosition(viewport: typeof engine.store.state.viewport, position: { x: number; y: number }) {
  const x = (position.x - viewport.x) * config.tileSizePx + Math.floor(config.paddingPx / 2)
  const y = (position.y - viewport.y) * config.tileSizePx + Math.floor(config.paddingPx / 2)

  return { x, y }
}

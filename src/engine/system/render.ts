import { config } from 'config'
import { Entity } from 'engine/entity'
import { World } from 'miniplex'
import { Application, Sprite } from 'pixi.js'

export function createRenderSystem(app: Application, world: World<Entity>) {
  const spritelessEntities = world.with('position', 'glyph').without('sprite')
  const spriteEntities = world.with('position', 'glyph', 'sprite')

  return () => {
    // create sprite for new entities
    for (const entity of spritelessEntities) {
      const sprite = Sprite.from(entity.glyph.char)

      const { x, y } = calculateScreenPosition(entity.position)
      sprite.position.set(x, y)
      sprite.zIndex = entity.glyph.zIndex

      sprite.tint = entity.glyph.color

      world.addComponent(entity, 'sprite', sprite)
      app.stage.addChild(sprite)
    }

    // update sprites
    // TODO only update if necessary
    for (const entity of spriteEntities) {
      const { x, y } = calculateScreenPosition(entity.position)
      entity.sprite.position.set(x, y)
    }
  }
}

function calculateScreenPosition(position: { x: number; y: number }) {
  const x = position.x * config.tileSizePx + Math.floor(config.paddingPx / 2)
  const y = position.y * config.tileSizePx + Math.floor(config.paddingPx / 2)

  return { x, y }
}

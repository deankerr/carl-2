import { config } from 'config'
import { Entity } from 'engine/entity'
import { World } from 'miniplex'
import { Application, Sprite } from 'pixi.js'

export function createRenderSystem(app: Application, world: World<Entity>) {
  const entities = world.with('position', 'glyph')

  return () => {
    for (const entity of entities) {
      const sprite = Sprite.from(entity.glyph.char)
      sprite.position.set(
        entity.position.x * config.tileSize,
        entity.position.y * config.tileSize
      )

      app.stage.addChild(sprite)
    }
  }
}

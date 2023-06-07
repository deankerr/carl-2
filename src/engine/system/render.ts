import { Entity } from 'engine/entity'
import { World } from 'miniplex'
import { Application, Sprite } from 'pixi.js'

export function createRenderSystem(app: Application, world: World<Entity>) {
  const entities = world.with('position', 'glyph')

  return () => {
    for (const entity of entities) {
      const sprite = Sprite.from(entity.glyph.char)
      sprite.position.set(entity.position.x, entity.position.y)
      sprite.scale.set(4)

      app.stage.addChild(sprite)
    }
  }
}

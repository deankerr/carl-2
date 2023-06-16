import { config } from 'config'

import { world } from '../entity'
import { store } from '../store'
import { app } from '@/lib/pixi'

type Viewport = typeof store.state.viewport
type Position = { x: number; y: number }

export function spriteUpdateSystem() {
  // queries
  const spriteEntities = world.with('position', '_sprite')
  const [player] = world.with('position', 'isPlayer') //? pull from store?

  return () => {
    //* update viewport location
    const viewport = { ...store.state.viewport }
    const anchor = player ? player.position : { x: 0, y: 0 }
    viewport.x = calculateViewportPosition(
      anchor.x,
      viewport.width,
      config.overworldWidth
    )
    viewport.y = calculateViewportPosition(
      anchor.y,
      viewport.height,
      config.overworldHeight
    )

    //* slide main container to match where the viewport should be
    app.stage.position.set(
      -viewport.x * config.tileSizePx,
      -viewport.y * config.tileSizePx
    )

    //* update sprites
    // TODO only update if necessary
    let spritesRendered = 0
    for (const entity of spriteEntities) {
      const { x, y } = calculateScreenPosition(entity.position)
      entity._sprite.container.position.set(x, y)

      if (shouldRenderSprite(viewport, entity.position)) {
        entity._sprite.container.visible = true
        spritesRendered++
      } else {
        entity._sprite.container.visible = false
      }
    }

    //* update viewport/stats
    store.set((state) => ({
      viewport,
      stats: {
        ...state.stats,
        spritesRendered,
      },
    }))
  }
}

function calculateViewportPosition(
  anchor: number,
  viewportSize: number,
  regionSize: number
) {
  const halfViewportSize = Math.floor(viewportSize / 2)

  if (anchor < halfViewportSize) {
    return 0
  } else if (anchor >= regionSize - halfViewportSize) {
    return regionSize - viewportSize
  }

  return anchor - halfViewportSize
}

function calculateScreenPosition(position: Position) {
  const x = position.x * config.tileSizePx
  const y = position.y * config.tileSizePx

  return { x, y }
}

function shouldRenderSprite(viewport: Viewport, position: Position) {
  const xInBounds =
    position.x >= viewport.x && position.x <= viewport.x + viewport.width
  const yInBounds =
    position.y >= viewport.y && position.y <= viewport.y + viewport.height
  return xInBounds && yInBounds
}

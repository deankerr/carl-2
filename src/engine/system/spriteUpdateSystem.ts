import { world } from '../entity'
import { store } from '../store'
import { config } from '@/.'

// TODO Refactor
// - move all sprites by moving main container?
// - encapsulate sprite creation +
// - completely rethink sprite creation/definitions

type Viewport = typeof store.state.viewport
type Position = { x: number; y: number }

export function spriteUpdateSystem() {
  // queries
  const spriteEntities = world.with('position', '_sprite')
  const [player] = world.with('position', 'isPlayer')

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

    //* update sprites
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

    //* update log
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
  if (anchor < halfViewportSize) return 0
  else if (anchor >= regionSize - halfViewportSize)
    return regionSize - viewportSize
  return anchor - halfViewportSize
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

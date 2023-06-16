import { store } from '@'
import { useStore } from 'statery'

export function DebugInfo() {
  const { viewport, stats, playerPosition } = useStore(store)
  const { fps, spritesRendered, spritesTotal, worldSize } = stats

  return (
    <div className="border-0 border-red-700">
      FPS: {fps} Entities: {worldSize} Viewport: [{viewport.x}, {viewport.y}]
      Sprites: {spritesRendered}/{spritesTotal} Player: [{playerPosition.x},{' '}
      {playerPosition.y}]
    </div>
  )
}

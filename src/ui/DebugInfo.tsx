import { useStore } from 'statery'

import { store } from '@/engine/store'

export function DebugInfo() {
  const { viewport, stats, player } = useStore(store)
  const { fps, spritesRendered, spritesTotal, worldSize } = stats

  return (
    <div className="border-0 border-red-700">
      FPS: {fps} Entities: {worldSize} Viewport: [{viewport.x}, {viewport.y}]
      Sprites: {spritesRendered}/{spritesTotal} Player: [{player.x}, {player.y}]
    </div>
  )
}

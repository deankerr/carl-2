import { useStore } from 'statery'

import { engine } from '@/.'
import { store } from '@/engine/store'

type Props = {
  engine: typeof engine
}

export function DebugInfo({ engine }: Props) {
  const { viewport, stats } = useStore(store)

  return (
    <div className="border-0 border-red-700">
      FPS: {stats.fps} Entities: {engine.world.size} Viewport: [{viewport.x},{' '}
      {viewport.y}] Sprites: {stats.spritesRendered}/{stats.spritesTotal}{' '}
      Player: [{engine.player.position.x}, {engine.player.position.y}]
    </div>
  )
}

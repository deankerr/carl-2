import { engine } from '@/.'
import { useStore } from 'statery'

type Props = {
  engine: typeof engine
}

export function DebugInfo({ engine }: Props) {
  const { viewport, stats } = useStore(engine.store)

  return (
    <div className="border-0 border-red-700">
      FPS: {stats.fps} Entities: {engine.world.size} Viewport: [{viewport.x},{' '}
      {viewport.y}] Sprites: {stats.spritesRendered}/{stats.spritesTotal}{' '}
      Player: [{engine.player.position.x}, {engine.player.position.y}]
    </div>
  )
}

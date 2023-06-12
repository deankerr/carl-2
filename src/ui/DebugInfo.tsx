import { engine } from '@/.'
import { useStore } from 'statery'

type Props = {
  engine: typeof engine
}

export function DebugInfo({ engine }: Props) {
  const { viewport, log } = useStore(engine.store)

  return (
    <div className="border-0 border-red-700">
      Entities: {engine.world.size} Viewport: [{viewport.x}, {viewport.y}]
      Sprites: {log.spritesRendered}/{log.spritesTotal}
    </div>
  )
}

import { useStore } from 'statery'
import { engine } from '..'

type Props = {
  engine: typeof engine
}

export function DebugInfo({ engine }: Props) {
  const { viewport } = useStore(engine.store)

  return (
    <div className="border-0 border-red-700">
      Entities: {engine.world.size} Viewport: [{viewport.x}, {viewport.y}]
      Sprites: ?
    </div>
  )
}

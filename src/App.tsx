import { createEngine } from 'engine/engine'
import { Application } from 'pixi.js'
import { useLayoutEffect, useRef } from 'react'
import { makeStore, useStore } from 'statery'
import { UIDemoComponent } from 'ui/UIDemoComponent'

const gameState = makeStore({
  state1: 'i am in statery',
  state2: 'me too',
  spriteRotation: 0
})

export type GameState = typeof gameState

function App() {
  const { state1, state2, spriteRotation } = useStore(gameState)

  return (
    <div className="flex h-screen flex-col items-center justify-items-center bg-gray-900">
      <div className="relative bg-yellow-100">
        <PixiJS />
        <ul className="absolute top-12">
          <li>
            <UIDemoComponent value={state1} position={12} />
          </li>
          <li>
            <UIDemoComponent
              value={`rot: ${Math.floor(spriteRotation)}`}
              position={2}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

function PixiJS() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.log('PixiJS create')
    const app = new Application<HTMLCanvasElement>({
      width: 800,
      height: 600,
      backgroundColor: 0x5bba6f
    })

    if (ref.current) ref.current.appendChild(app.view)

    const engine = createEngine(app)
    engine.demo(gameState)

    return () => {
      console.log('PixiJS destroy')
      app.destroy(true, true)
    }
  }, [])

  return <div ref={ref} />
}

export default App

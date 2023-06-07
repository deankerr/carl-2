import { createEngine } from 'engine/engine'
import { Application } from 'pixi.js'
import { useLayoutEffect, useRef } from 'react'

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-items-center bg-gray-800">
      <div className="relative bg-yellow-100">
        <PixiJS />
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
    engine.render()

    return () => {
      console.log('PixiJS destroy')
      app.destroy(true, true)
    }
  }, [])

  return <div ref={ref} />
}

export default App

// const demoGameState = makeStore({
//   state1: 'i am in statery',
//   state2: 'me too',
//   spriteRotation: 0
// })

// export type DemoGameState = typeof demoGameState

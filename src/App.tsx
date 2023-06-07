import { engine } from 'engine/engine'
import { useLayoutEffect, useRef } from 'react'

type AppProps = {
  engine: typeof engine
}

function App({ engine }: AppProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-items-center bg-gray-800">
      <div className="relative bg-yellow-100">
        <PixiJS engine={engine} />
      </div>
    </div>
  )
}

function PixiJS({ engine }: AppProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.log('<PixiJS> create')

    const div = ref.current
    if (div) div.appendChild(engine.app.view)

    // engine.render()

    return () => {
      console.log('<PixiJS> destroy')
      if (div) div.removeChild(engine.app.view)
    }
  }, [engine.app.view])

  return <div ref={ref} />
}

export default App

// const demoGameState = makeStore({
//   state1: 'i am in statery',
//   state2: 'me too',
//   spriteRotation: 0
// })

// export type DemoGameState = typeof demoGameState

import { useLayoutEffect, useRef } from 'react'
import { engine } from './'
import { DebugInfo } from './ui/DebugInfo'

type AppProps = {
  engine: typeof engine
}
// bg-gray-800
function App({ engine }: AppProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-gray-400">
      {/* <div className="relative"> */}
      <PixiJS engine={engine} />
      <DebugInfo engine={engine} />
      {/* </div> */}
    </div>
  )
}

function PixiJS({ engine }: AppProps) {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.log('<PixiJS> create')

    const div = ref.current
    if (div) div.appendChild(engine.app.view)

    return () => {
      console.log('<PixiJS> destroy')
      if (div) div.removeChild(engine.app.view)
    }
  }, [engine.app.view])

  return <div ref={ref} className="border-0 border-red-700" />
}

export default App

// const demoGameState = makeStore({
//   state1: 'i am in statery',
//   state2: 'me too',
//   spriteRotation: 0
// })

// export type DemoGameState = typeof demoGameState

import { app, engine, config } from '@/.'
import { useLayoutEffect, useRef } from 'react'
import { DebugInfo } from './ui/DebugInfo'

type AppProps = {
  engine: typeof engine
}

function App({ engine }: AppProps) {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-gray-400">
      {/* <div className="relative"> */}
      <PixiJS />
      {config.showDebugUI && <DebugInfo engine={engine} />}
      {/* </div> */}
    </div>
  )
}

function PixiJS() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const div = ref.current
    if (div) div.appendChild(app.view)

    return () => {
      if (div) div.removeChild(app.view)
    }
  }, [])

  return <div ref={ref} className="border-0 border-red-700" />
}

export default App

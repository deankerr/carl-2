import { app, engine } from '@/.'
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
      <DebugInfo engine={engine} />
      {/* </div> */}
    </div>
  )
}

function PixiJS() {
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.log('<PixiJS> create')

    const div = ref.current
    if (div) div.appendChild(app.view)

    return () => {
      console.log('<PixiJS> destroy')
      if (div) div.removeChild(app.view)
    }
  }, [])

  return <div ref={ref} className="border-0 border-red-700" />
}

export default App

import { config } from '@'
import { app } from '@lib'
import { useLayoutEffect, useRef } from 'react'

import { DebugInfo } from './ui/DebugInfo'

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-gray-400">
      {/* <div className="relative"> */}
      <PixiJS />
      {config.showDebugUI && <DebugInfo />}
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

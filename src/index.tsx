import 'tailwindcss/tailwind.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { createPIXIApp, loadAssetBundle } from './lib/pixi'
export { config } from './config'
import { createEngine } from './engine/engine'

export const app = createPIXIApp()
await loadAssetBundle()

export const engine = createEngine()
engine.init()
app.ticker.add((dt: number) => engine.run(dt))

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App engine={engine} />
  </StrictMode>
)

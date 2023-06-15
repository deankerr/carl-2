import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import App from './App'
import { createEngine } from './engine/engine'
import { createPIXIApp, loadAssetBundle } from './lib/pixi'

export { config } from './config'

export const app = createPIXIApp()
await loadAssetBundle()

export const engine = createEngine()
engine.init()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App engine={engine} />
  </StrictMode>
)

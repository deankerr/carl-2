import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import App from './App'
import { createEngine } from './engine/engine'
import { loadAssetBundle } from './lib/pixi'

export { config } from './config'

await loadAssetBundle()

export const engine = createEngine()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

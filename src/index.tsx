import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import App from './App'
import { engine } from './engine/engine'
import { loadAssetBundle } from './lib/pixi'

await loadAssetBundle()
engine.start()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

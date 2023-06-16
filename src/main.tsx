import { engine } from '@'
import { loadAssetBundle } from '@lib'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import App from './App'

await loadAssetBundle()
engine.init()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

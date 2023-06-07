import App from 'App'
import { engine, loadManifest } from 'engine/engine'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

await loadManifest()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App engine={engine} />
  </StrictMode>
)

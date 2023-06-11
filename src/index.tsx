import App from 'App'
import { createEngine } from 'engine/engine'
import { Assets } from 'pixi.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import manifest from './public/assets/manifest.json'

export const engine = createEngine()

console.log('init manifest loader')
await Assets.init({ manifest: manifest })
const bundleIds = manifest.bundles.map((bundle) => bundle.name)
await Assets.loadBundle(bundleIds)
console.log('assets loaded?')

// engine.app.ticker.add(engine.render)
engine.init()

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App engine={engine} />
  </StrictMode>
)

import { engine } from '@'
import { loadAssetBundle } from '@lib'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'

import App from './App'

loadAssetBundle()
  .then(engine.init)
  .catch((err) => {
    throw typeof err === 'string' ? new Error(err) : new Error()
  })

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

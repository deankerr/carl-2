// import { config } from '@/config'
import { config } from '../config'
import { Application, Assets } from 'pixi.js'
import manifest from '../public/assets/manifest.json'

export function createPIXIApp() {
  const app = new Application<HTMLCanvasElement>({
    width: config.pixiAppWidth,
    height: config.pixiAppHeight,
  })

  // PIXI.JS Firefox extension support
  window.__PIXI_APP__ = app

  app.stage.sortableChildren = true

  window.addEventListener('resize', () => resizeApp(app))
  resizeApp(app)

  return app
}

function resizeApp(app: Application<HTMLCanvasElement>) {
  const screenWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  const scale = Math.min(
    screenWidth / config.pixiAppWidth,
    screenHeight / config.pixiAppHeight
  )

  // adjusted values
  const margin = 48
  const newWidth = Math.floor(scale * config.pixiAppWidth) - margin
  const newHeight = Math.floor(scale * config.pixiAppHeight) - margin

  app.view.style.width = `${newWidth}px`
  app.view.style.height = `${newHeight}px`
}

export async function loadAssetBundle() {
  await Assets.init({ manifest: manifest })
  const bundleIds = manifest.bundles.map((bundle) => bundle.name)
  await Assets.loadBundle(bundleIds)
}

declare global {
  interface Window {
    __PIXI_APP__: Application
  }
}

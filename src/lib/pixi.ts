import { Application, Assets } from 'pixi.js'

import manifest from '../public/assets/manifest.json'
import { config } from '@/.'

const { tileSizePx, viewportWidth, viewportHeight } = config

const appWidth = tileSizePx * viewportWidth
const appHeight = tileSizePx * viewportHeight

export function createPIXIApp() {
  const app = new Application<HTMLCanvasElement>({
    width: appWidth,
    height: appHeight,
  })

  // PIXI.JS Firefox extension support
  // window.__PIXI_APP__ = app

  app.stage.interactiveChildren = false

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

  const scale = Math.min(screenWidth / appWidth, screenHeight / appHeight)

  // adjusted values
  const margin = 48
  const newWidth = Math.floor(scale * appWidth) - margin
  const newHeight = Math.floor(scale * appHeight) - margin

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

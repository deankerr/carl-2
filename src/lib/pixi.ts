import { Application, Assets } from 'pixi.js'

import manifest from '../public/assets/manifest.json'
import { config } from '@/.'

const { tileSizePx, viewportWidth, viewportHeight } = config

const appWidth = tileSizePx * viewportWidth
const appHeight = tileSizePx * viewportHeight

const appMargin = 48

export const app = new Application<HTMLCanvasElement>({
  width: appWidth,
  height: appHeight,
})
app.stage.interactiveChildren = false

window.addEventListener('resize', resizeApp)
resizeApp()

function resizeApp() {
  // get size of window
  const screenWidth = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  )
  const screenHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )

  // scale to the fit the smaller axis
  const scale = Math.min(screenWidth / appWidth, screenHeight / appHeight)

  // set the new size
  const newWidth = Math.floor(scale * appWidth) - appMargin
  const newHeight = Math.floor(scale * appHeight) - appMargin
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

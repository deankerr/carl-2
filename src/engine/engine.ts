import { World } from 'miniplex'
import { Application } from 'pixi.js'
import { makeStore } from 'statery'

import { config } from 'config'
import { Entity, createEntityFactory } from './entity'
import { createInput } from './input'
import { createOutdoors } from './region'
import { createRenderSystem } from './system/render'

type System = () => void

export function createEngine() {
  console.log('create engine')

  // PIXI
  const app = new Application<HTMLCanvasElement>({
    width: config.pixiAppWidth,
    height: config.pixiAppHeight,
    backgroundColor: 'rgb(2, 5, 2)',
  })

  // PIXI.JS Firefox extension support
  window.__PIXI_APP__ = app

  app.stage.sortableChildren = true

  window.addEventListener('resize', () => resizeApp(app))
  resizeApp(app)

  // Entities
  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  // temp - needed before turn scheduler implemented
  const player = createEntity('player', 30, 15)

  // Main update loop
  const update = (tempAction: string) => {
    // console.log('update', tempAction)
    switch (tempAction) {
      case 'pc left':
        player.position.x--
        break
      case 'pc right':
        player.position.x++
        break
      case 'pc up':
        player.position.y--
        break
      case 'pc down':
        player.position.y++
    }
  }
  createInput(update)

  const system: System[] = []

  const store = makeStore({
    viewport: {
      x: 0,
      y: 0,
      width: config.viewportWidthCells,
      height: config.viewportHeightCells,
    },
    testCurrentRegion: 'outdoors',
  })

  const init = () => {
    // Systems
    const render = createRenderSystem()
    system.push(render)

    createOutdoors()
    app.ticker.add(render)
  }

  return { app, world, createEntity, system, update, init, player, store }
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

declare global {
  interface Window {
    __PIXI_APP__: Application
  }
}

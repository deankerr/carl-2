import { World } from 'miniplex'
import { Application } from 'pixi.js'

import { config } from 'config'
import { Entity, createEntityFactory } from './entity'
import { createTestRegion } from './region'
import { createRenderSystem } from './system/render'

export function createEngine() {
  console.log('create engine')

  const app = new Application<HTMLCanvasElement>({
    width: config.appWidth,
    height: config.appHeight,
    backgroundColor: 0x000000
  })

  window.addEventListener('resize', () => resizeApp(app))
  resizeApp(app)

  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  // createEntity('player', 50, 50)

  const render = createRenderSystem(app, world)

  const run = () => {
    createTestRegion(world, (x, y) => {
      createEntity('wall', x, y)
    })

    render()
  }

  return { app, world, createEntity, render, run }
}

export const engine = createEngine()

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
    screenWidth / config.appWidth,
    screenHeight / config.appHeight
  )

  // adjusted values
  const newWidth = Math.floor(scale * config.appWidth)
  const newHeight = Math.floor(scale * config.appHeight)

  app.view.style.width = `${newWidth}px`
  app.view.style.height = `${newHeight}px`
}

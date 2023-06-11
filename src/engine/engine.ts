import { World } from 'miniplex'
import { Application } from 'pixi.js'

import { config } from 'config'
import { Entity, createEntityFactory } from './entity'
import { createInput } from './input'
import { createOutdoors } from './region'
import { createRenderSystem } from './system/render'

export function createEngine() {
  console.log('create engine')

  // PIXI
  const app = new Application<HTMLCanvasElement>({
    width: config.appWidth,
    height: config.appHeight,
    backgroundColor: 'rgb(2, 5, 2)'
  })

  app.stage.sortableChildren = true

  window.addEventListener('resize', () => resizeApp(app))
  resizeApp(app)

  // Entities
  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  // Systems
  const render = createRenderSystem(app, world)

  // temp create region
  // createTestRegion(world, (x, y) => {
  //   if (x > 15 && x < 35 && y > 6 && y < 18) createEntity('deadTree', x, y)
  //   else createEntity('wall', x, y)
  // })

  const player = createEntity('player', 30, 15)

  const update = (tempAction: string) => {
    console.log('update', tempAction)
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

  const init = () => {
    createOutdoors()

    app.ticker.add(render)
  }

  return { app, world, createEntity, render, update, init }
}

// export const engine = createEngine()
// console.log('engine', engine)

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

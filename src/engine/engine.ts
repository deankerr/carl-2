import { World } from 'miniplex'
import { Application, Assets } from 'pixi.js'
import manifest from '../public/assets/manifest.json'
import { Entity, createEntityFactory } from './entity'
import { createRenderSystem } from './system/render'

export function createEngine() {
  console.log('create engine')

  const app = new Application<HTMLCanvasElement>({
    width: 800,
    height: 600,
    backgroundColor: 0x5bba6f
  })

  const world = new World<Entity>()
  const createEntity = createEntityFactory(world)

  createEntity('player', 50, 50)

  const render = createRenderSystem(app, world)
  return { app, world, createEntity, render }
}

export const engine = createEngine()

export async function loadManifest() {
  console.log('init manifest loader')
  await Assets.init({ manifest: manifest })
  const bundleIds = manifest.bundles.map((bundle) => bundle.name)
  await Assets.loadBundle(bundleIds)
  console.log('assets loaded?')
}

// engine.render()

// export function createDemoEngine(app: Application<HTMLCanvasElement>) {
//   console.log('create demo engine')

//   const demo = (gameState: DemoGameState) => {
//     // sprite
//     const testSprite = Sprite.from('/src/public/pc.png')
//     testSprite.position.set(400, 300)
//     testSprite.scale.set(4)
//     app.stage.addChild(testSprite)

//     // text
//     const testText = new Text(gameState.state.state1)
//     testText.position.set(300, 200)
//     testText.anchor.set(0.5)
//     app.stage.addChild(testText)

//     // ticker
//     app.ticker.add((dt: number) => {
//       // update state
//       gameState.set((state) => ({
//         spriteRotation: state.spriteRotation + 0.2
//       }))

//       // move things
//       testSprite.rotation = gameState.state.spriteRotation
//       testText.rotation = testText.rotation + 0.01 * dt
//     })
//   }

//   return { app, demo }
// }

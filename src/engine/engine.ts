import { Application, Sprite, Text } from 'pixi.js'

export function createEngine(app: Application<HTMLCanvasElement>) {
  console.log('engine create')

  const state = {
    someState: 'hehe'
  }

  const demo = () => {
    const testSprite = Sprite.from('/src/public/pc.png')
    testSprite.position.set(400, 300)
    testSprite.scale.set(4)
    app.stage.addChild(testSprite)

    const testText = new Text('Hello World!')
    testText.position.set(300, 200)
    testText.anchor.set(0.5)
    app.stage.addChild(testText)

    app.ticker.add((dt: number) => {
      testSprite.rotation = testSprite.rotation + 0.1 * dt
      testText.rotation = testText.rotation + 0.01 * dt
    })
  }

  return { app, state, demo }
}

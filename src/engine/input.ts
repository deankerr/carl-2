import { app, engine } from '@/.'
import { bind } from 'mousetrap'
import { utils } from 'pixi.js'

export function createInput(update: (tempAction: string) => void) {
  // player controls
  bind('left', () => update('pc left'))
  bind('right', () => update('pc right'))
  bind('up', () => update('pc up'))
  bind('down', () => update('pc down'))

  bind('E', () => {
    console.log('Engine', engine)
    console.log('PIXI', app)
    console.log('BaseTextureCache', utils.BaseTextureCache)
    console.log('TextureCache', utils.TextureCache)
  })
}

import { config, engine } from '@'
import { app } from '@lib'
import { utils } from 'pixi.js'

export function logEngineInfo() {
  console.log('Engine', engine)
  console.log('Config', config)
  console.log('PIXI', app)
  console.log('TextureCache', utils.TextureCache)
}

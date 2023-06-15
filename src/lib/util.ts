import { utils } from 'pixi.js'

import { app, config, engine } from '@/.'

export function logEngineInfo() {
  console.log('Engine', engine)
  console.log('Config', config)
  console.log('PIXI', app)
  console.log('TextureCache', utils.TextureCache)
}

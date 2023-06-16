import { utils } from 'pixi.js'

import { config, engine } from '@/.'
import { app } from '@/lib/pixi'

export function logEngineInfo() {
  console.log('Engine', engine)
  console.log('Config', config)
  console.log('PIXI', app)
  console.log('TextureCache', utils.TextureCache)
}

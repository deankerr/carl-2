import { config, world } from '@'
import { app } from '@lib'
import { utils } from 'pixi.js'

export function logEngineInfo() {
  console.log('World', world.size, world)
  console.log('Config', config)
  console.log('PIXI', app)
  console.log('TextureCache', utils.TextureCache)
}

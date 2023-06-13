import { bind } from 'mousetrap'
// import { logEngineInfo } from '@/lib/util'
import { logEngineInfo } from '../lib/util'

export function createInput(update: (tempAction: string) => void) {
  // player controls
  bind('left', () => update('pc left'))
  bind('right', () => update('pc right'))
  bind('up', () => update('pc up'))
  bind('down', () => update('pc down'))

  bind('E', () => logEngineInfo())
}

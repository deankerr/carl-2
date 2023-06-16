import { logEngineInfo } from '@lib'
import { bind } from 'mousetrap'

export function bindInput(update: (tempAction: string) => void) {
  // player controls
  bind('left', () => update('pc left'))
  bind('right', () => update('pc right'))
  bind('up', () => update('pc up'))
  bind('down', () => update('pc down'))

  // debug log
  bind('E', () => logEngineInfo())
}

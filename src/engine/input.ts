import { bind } from 'mousetrap'

import { logEngineInfo } from '@/lib/util'

export function bindInput(update: (tempAction: string) => void) {
  // player controls
  bind('left', () => update('pc left'))
  bind('right', () => update('pc right'))
  bind('up', () => update('pc up'))
  bind('down', () => update('pc down'))

  // debug log
  bind('E', () => logEngineInfo())
}

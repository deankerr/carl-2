import { bind } from 'mousetrap'

export function createInput(update: (tempAction: string) => void) {
  bind('left', () => update('pc left'))
  bind('right', () => update('pc right'))
  bind('up', () => update('pc up'))
  bind('down', () => update('pc down'))
}

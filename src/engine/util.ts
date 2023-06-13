import random from 'random'

// TODO lib wrapper
const rnd = random.clone('moomoo')

console.log(
  'rnd:',
  rnd.int(0, 10),
  rnd.int(0, 10),
  rnd.int(0, 10),
  rnd.int(0, 10)
)

const a = rnd.choice([1, 2, 3, 4])

export function randomInt(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function pick<T>(list: T[]): T {
  const item = rnd.choice(list)
  if (item === undefined) throw new Error('picked item was undefined')

  return item
}

// TODO seeded random lib
export function random(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function pick<T>(list: T[]): T {
  const n = random(0, list.length - 1)
  return list[n]
}

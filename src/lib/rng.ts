import { config } from '@'
import random, { Random } from 'random'
import seedrandom from 'seedrandom'

class RandomExtended extends Random {
  seed(seed: string) {
    // workaround for type error in Random.use
    // https://github.com/transitive-bullshit/random/pull/38#issuecomment-1032563231
    const prng = seed ? seedrandom(seed) : seedrandom()
    const rng = random.clone(prng).rng
    this.use(rng)
    seed ? console.log('RNG seed set:', seed) : console.log('RNG no seed')
  }

  // convenience wrapper around choice() to skip checking for undefined
  pick<T>(array: T[]): T {
    const result = this.choice(array)
    if (result === undefined) throw new Error('random pick returned undefined')
    return result
  }
}

export const rng = new RandomExtended()
rng.seed(config.seed)

import { World } from 'miniplex'
import { Sprite } from 'pixi.js'

export type Entity = {
  id: number // ?
  base: string // ? keyof template

  sprite?: Sprite
  // Components
  glyph: {
    char: string // ? keyof spritesheet ids
    color: string // ? future HSL Color object
    bgColor: string // ? ^
    zIndex: number //? replace with entity catagories + pixi containers
  }

  position: {
    x: number // grid reference
    y: number
  }

  isPlayer?: true
  solid?: true // blocks movement
}

export type EntityKey = keyof typeof entityTemplates

export const entityTemplates = {
  player: {
    glyph: {
      char: '@',
      color: 'rgb(140, 237, 39)',
      bgColor: '',
      zIndex: 3
    },
    isPlayer: true
  },
  wall: {
    glyph: {
      char: 'wall',
      color: 'rgb(118, 118, 118)',
      bgColor: '',
      zIndex: 1
    },
    solid: true
  },
  path: {
    glyph: {
      char: 'path',
      color: 'rgb(38, 38, 38)',
      bgColor: '',
      zIndex: 1
    }
  },
  tree: {
    glyph: {
      char: 'tree',
      color: 'rgb(65, 122, 55)',
      bgColor: '',
      zIndex: 1
    }
  },
  deadTree: {
    glyph: {
      char: 'tree',
      color: 'rgb(151, 90, 5)',
      bgColor: '',
      zIndex: 1
    }
  },

  shrub: {
    glyph: {
      char: 'shrub',
      color: 'rgb(80, 151, 67)',
      bgColor: '',
      zIndex: 1
    }
  },
  grass1: {
    glyph: {
      char: 'grass1',
      color: 'rgb(100, 111, 42)',
      bgColor: '',
      zIndex: 1
    }
  },
  deadGrass: {
    glyph: {
      char: 'debris',
      color: 'rgb(86, 67, 61)',
      bgColor: '',
      zIndex: 1
    }
  },
  deadGrass2: {
    glyph: {
      char: 'debris1',
      color: 'rgb(86, 67, 61)',
      bgColor: '',
      zIndex: 1
    }
  },

  grass2: {
    glyph: {
      char: 'grass2',
      color: 'rgb(100, 111, 42)',
      bgColor: '',
      zIndex: 1
    }
  },
  grass3: {
    glyph: {
      char: 'grass3',
      color: 'rgb(100, 111, 42)',
      bgColor: '',
      zIndex: 1
    }
  },
  grass4: {
    glyph: {
      char: 'grass4',
      color: 'rgb(100, 111, 42)',
      bgColor: '',
      zIndex: 1
    }
  },
  flowerPurple: {
    glyph: {
      char: 'flower',
      color: 'rgb(236, 126, 172)',
      bgColor: '',
      zIndex: 1
    }
  },
  flowerYellow: {
    glyph: {
      char: 'flower',
      color: 'rgb(221, 218, 56)',
      bgColor: '',
      zIndex: 1
    }
  },
  flowersPurple1: {
    glyph: {
      char: 'bloop1',
      color: 'rgb(236, 126, 172)',
      bgColor: '',
      zIndex: 1
    }
  },
  flowersPurple2: {
    glyph: {
      char: 'bloop2',
      color: 'rgb(236, 126, 172)',
      bgColor: '',
      zIndex: 1
    }
  },
  flowersYellow1: {
    glyph: {
      char: 'bloop1',
      color: 'rgb(221, 218, 56)',
      bgColor: '',
      zIndex: 1
    }
  },
  flowersYellow2: {
    glyph: {
      char: 'bloop2',
      color: 'rgb(221, 218, 56)',
      bgColor: '',
      zIndex: 1
    }
  }
} satisfies Record<string, Partial<Omit<Entity, 'id' | 'base'>>>

export function createEntityFactory(world: World<Entity>) {
  let entityCount = 0 // TODO move to state

  const create = (
    key: keyof typeof entityTemplates,
    x: number,
    y: number
  ): Entity => {
    const entity = {
      id: entityCount++,
      base: key,

      ...entityTemplates[key],

      position: { x, y }
    }

    world.add(entity)
    return entity
  }

  return create
}

import type { Tag } from '@'
import { pallette } from '@lib'

type Template = {
  sprite: string | string[]
  tint: string | string[]
  bgTint?: string | string[]
  layer?: number
  animate?: number
  tags?: Tag[]
}

const beings = {
  player: {
    sprite: '@',
    tint: '#ee82ee',
    layer: 3,
    tags: ['isPlayer'],
  },
} satisfies Record<string, Template>

const structure = {
  wall: {
    sprite: 'wall',
    tint: '#767676',
    tags: ['solid'],
  },

  path: {
    sprite: 'path',
    tint: '#262626',
  },
} satisfies Record<string, Template>

const flora = {
  tree: {
    sprite: 'tree',
    tint: pallette.oryxPlant,
  },

  deadTree: {
    sprite: 'tree',
    tint: pallette.e32DeadTree,
  },

  shrub: {
    sprite: ['shrub_1', 'shrub_2'],
    tint: pallette.oryxPlant,
  },

  plant: {
    sprite: 'plant_1',
    tint: pallette.oryxPlant,
  },

  flowers: {
    sprite: ['flower_b1', 'flower_b2', 'flower_b3', 'flower_b4', 'flower_b5'],
    tint: pallette.e32Flowers,
  },

  mushroom: {
    sprite: ['mushroom_1', 'mushroom_2', 'mushroom_3', 'mushroom_4'],
    tint: pallette.e32Mushroom,
  },

  grass: {
    sprite: [
      'grass_b1',
      'grass_b2',
      'grass_b3',
      'grass_b4',
      'grass_b5',
      'grass_b6',
      'grass_b7',
      'grass_b8',
    ],
    tint: pallette.oryxGrass,
    tags: ['isGrass'],
  },

  deadGrass: {
    sprite: [
      'grass_b1',
      'grass_b2',
      'grass_b3',
      'grass_b4',
      'grass_b5',
      'grass_b6',
      'grass_b7',
      'grass_b8',
    ],
    tint: pallette.oryxDeadGrass,
  },
} satisfies Record<string, Template>

const mineral = {
  dust: {
    sprite: 'debris',
    tint: '#5e5753',
  },

  boulder: {
    sprite: ['boulder'],
    tint: ['#5e5753'],
  },

  rocks: {
    sprite: [
      'rocks_1',
      'rocks_2',
      'rocks_3',
      'rocks_4',
      'rocks_5',
      'rocks_6',
      'rocks_7',
      'rocks_8',
    ],
    tint: ['#685a51'],
  },

  hill: {
    sprite: 'hill',
    tint: '#453c37',
  },
} satisfies Record<string, Template>

const liquid = {
  waterA: {
    sprite: ['water_A1', 'water_A2'],
    tint: pallette.e32Water[1],
    bgTint: pallette.e32Water[0],
    layer: 2,
    animate: 1000,
  },
  waterB: {
    sprite: ['water_B1', 'water_B2'],
    tint: pallette.e32Water[1],
    bgTint: pallette.e32Water[0],
    layer: 2,
    animate: 1000,
  },
  waterC: {
    sprite: ['water_C1', 'water_C2'],
    tint: pallette.e32Water[1],
    bgTint: pallette.e32Water[0],
    layer: 2,
    animate: 1000,
  },
  waterD: {
    sprite: ['water_D1', 'water_D2'],
    tint: pallette.e32Water[1],
    bgTint: pallette.e32Water[0],
    layer: 2,
    animate: 1000,
  },
} satisfies Record<string, Template>

export const entityTemplates = {
  ...beings,
  ...structure,
  ...flora,
  ...mineral,
  ...liquid,
} satisfies Record<string, Template>

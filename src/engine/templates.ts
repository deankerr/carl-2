import { Tag } from './entity'
import { pallette } from '@/lib/color'

type Template = {
  sprite: string | string[]
  tint: string | string[]
  bgTint?: string | string[]
  zIndex?: number
  animate?: number
  tags?: Tag[]
}

const beings = {
  player: {
    sprite: '@',
    tint: '#ee82ee',
    zIndex: 3,
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
    tint: pallette.e32Tree,
  },

  deadTree: {
    sprite: 'tree',
    tint: pallette.e32DeadTree,
  },

  shrub: {
    sprite: 'shrub_1',
    tint: pallette.e32Tree,
  },

  plant: {
    sprite: 'plant_1',
    tint: pallette.e32Tree,
  },

  flowers: {
    sprite: [
      'flower_1',
      'flower_2',
      'flower_3',
      'flower_4',
      'flower_5',
      'flower_6',
      'flower_7',
      'flower_8',
    ],
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
    tint: pallette.e32Grass,
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
    tint: pallette.e32DeadGrass,
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

const c_waterLight = '#285f9d'
const c_waterDark = '#132e4e'

const liquid = {
  waterA: {
    sprite: ['water_A1', 'water_A2'],
    tint: c_waterLight,
    bgTint: c_waterDark,
    zIndex: 2, // ! temp
    animate: 1000,
  },
  waterB: {
    sprite: ['water_B1', 'water_B2'],
    tint: c_waterLight,
    bgTint: c_waterDark,
    zIndex: 2, // ! temp
    animate: 1000,
  },
  waterC: {
    sprite: ['water_C1', 'water_C2'],
    tint: c_waterLight,
    bgTint: c_waterDark,
    zIndex: 2, // ! temp
    animate: 1000,
  },
  waterD: {
    sprite: ['water_D1', 'water_D2'],
    tint: c_waterLight,
    bgTint: c_waterDark,
    zIndex: 2, // ! temp
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

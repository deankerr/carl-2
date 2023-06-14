import { pallette } from '@/lib/color'
import { Tag } from './entity'

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
    tint: '#417a37',
  },

  deadTree: {
    sprite: 'tree',
    tint: '#975a05',
  },

  shrub: {
    sprite: 'shrub',
    tint: '#509743',
  },

  plant: {
    sprite: 'plant',
    tint: '#62c34a',
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
    tint: ['#ec7eac', '#ddda38', '#2ca6bc', '#dd4838'],
  },

  mushroom: {
    sprite: ['mushroom_1', 'mushroom_2', 'mushroom_3', 'mushroom_4'],
    tint: ['#975a05', '#8a281d'],
  },

  grass: {
    sprite: [
      'grass_a1',
      'grass_a2',
      'grass_a3',
      'grass_a4',
      'grass_a5',
      'grass_a6',
      'grass_a7',
      'grass_a8',
    ],
    tint: pallette.forestPalette3,
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
    tint: ['#56433d'],
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
const c_waterDark = '#1d4a7d'

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

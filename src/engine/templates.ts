import { EntityFlags } from './entity'

type Template = RandomGlyph & Partial<EntityFlags>

type RandomGlyph = {
  char: string | string[]
  color: string | string[]
  zIndex: number
}

export const entityTemplates = {
  player: {
    char: '@',
    color: 'rgb(140, 237, 39)',
    zIndex: 3,
    isPlayer: true,
  },
  wall: {
    char: 'wall',
    color: 'rgb(118, 118, 118)',
    zIndex: 1,
    solid: true,
  },
  path: {
    char: 'path',
    color: 'rgb(38, 38, 38)',
    zIndex: 1,
  },
  dust: {
    char: ['debris'],
    color: 'rgb(94, 87, 83)',
    zIndex: 1,
  },
  tree: {
    char: 'tree',
    color: 'rgb(65, 122, 55)',
    zIndex: 1,
  },
  deadTree: {
    char: 'tree',
    color: 'rgb(151, 90, 5)',
    zIndex: 1,
  },
  shrub: {
    char: 'shrub',
    color: 'rgb(80, 151, 67)',
    zIndex: 1,
  },
  plant: {
    char: 'plant',
    color: 'rgb(98, 195, 74)',
    zIndex: 1,
  },
  flowers: {
    char: [
      'flower_1',
      'flower_2',
      'flower_3',
      'flower_4',
      'flower_5',
      'flower_6',
      'flower_7',
      'flower_8',
    ],
    color: [
      'rgb(236, 126, 172)',
      'rgb(221, 218, 56)',
      'rgb(44, 166, 188)',
      'rgb(221, 72, 56)',
    ],
    zIndex: 1,
  },
  mushroom: {
    char: ['mushroom_1', 'mushroom_2', 'mushroom_3', 'mushroom_4'],
    color: ['rgb(151, 90, 5)', 'rgb(138, 40, 29)'],
    zIndex: 1,
  },
  grass: {
    char: [
      'grass_a1',
      'grass_a2',
      'grass_a3',
      'grass_a4',
      'grass_a5',
      'grass_a6',
      'grass_a7',
      'grass_a8',
    ],
    color: 'rgb(100, 111, 42)',
    zIndex: 1,
  },
  deadGrass: {
    char: [
      'grass_b1',
      'grass_b2',
      'grass_b3',
      'grass_b4',
      'grass_b5',
      'grass_b6',
      'grass_b7',
      'grass_b8',
    ],
    color: ['rgb(86, 67, 61)'],
    zIndex: 1,
  },
  boulder: {
    char: ['boulder'],
    color: ['rgb(94, 87, 83)'],
    zIndex: 1,
  },
  rocks: {
    char: [
      'rocks_1',
      'rocks_2',
      'rocks_3',
      'rocks_4',
      'rocks_5',
      'rocks_6',
      'rocks_7',
      'rocks_8',
    ],
    color: ['rgb(104, 90, 81)'],
    zIndex: 1,
  },
  hill: {
    char: ['hill'],
    color: ['rgb(69, 60, 55)'],
    zIndex: 1,
  },
} satisfies Record<string, Template>

/*

entity: {
  char: ['entity'],
  color: ['color'],
  zIndex: 1,
},

*/

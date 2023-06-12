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
    isPlayer: true
  },
  wall: {
    char: 'wall',
    color: 'rgb(118, 118, 118)',
    zIndex: 1,
    solid: true
  },
  path: {
    char: 'path',
    color: 'rgb(38, 38, 38)',
    zIndex: 1
  },
  tree: {
    char: 'tree',
    color: 'rgb(65, 122, 55)',
    zIndex: 1
  },
  deadTree: {
    char: 'tree',
    color: 'rgb(151, 90, 5)',
    zIndex: 1
  },
  shrub: {
    char: 'shrub',
    color: 'rgb(80, 151, 67)',
    zIndex: 1
  },
  deadGrass: {
    char: ['debris', 'debris1'],
    color: 'rgb(86, 67, 61)',
    zIndex: 1
  },
  grass: {
    char: ['grass', 'grass1', 'grass2', 'grass3', 'grass4'],
    color: 'rgb(100, 111, 42)',
    zIndex: 1
  },
  flowers: {
    char: ['flower', 'bloop1', 'bloop2'],
    color: [
      'rgb(236, 126, 172)',
      'rgb(221, 218, 56)',
      'rgb(44, 166, 188)',
      'rgb(221, 72, 56)'
    ],
    zIndex: 1
  }
} satisfies Record<string, Template>

// function flowers(colors: string[], chars: string[]) {
//   const templates: Record<string, Template> = {}

//   let count = 1
//   for (const color of colors) {
//     for (const char of chars) {
//       templates['flowers' + count++] = {

//           char,
//           color,

//           zIndex: 1
//         }
//       }
//     }
//   }

//   return templates
// }

// flowerPurple: {
//   glyph: {
//     char: 'flower',
//     color: 'rgb(236, 126, 172)',
//
//     zIndex: 1
//   }
// },
// flowerYellow: {
//   glyph: {
//     char: 'flower',
//     color: 'rgb(221, 218, 56)',
//
//     zIndex: 1
//   }
// },
// flowersPurple1: {
//   glyph: {
//     char: 'bloop1',
//     color: 'rgb(236, 126, 172)',
//
//     zIndex: 1
//   }
// },
// flowersPurple2: {
//   glyph: {
//     char: 'bloop2',
//     color: 'rgb(236, 126, 172)',
//
//     zIndex: 1
//   }
// },
// flowersYellow1: {
//   glyph: {
//     char: 'bloop1',
//     color: 'rgb(221, 218, 56)',
//
//     zIndex: 1
//   }
// },
// flowersYellow2: {
//   glyph: {
//     char: 'bloop2',
//     color: 'rgb(221, 218, 56)',
//
//     zIndex: 1
//   }
// }
// ...flowers(['red'], ['flower'])

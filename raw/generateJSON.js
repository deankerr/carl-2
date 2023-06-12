#!/usr/bin/env node
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const spriteWidthPx = 16
const spriteHeightPx = 16
const filename = '16'

const labels = [
  'grass debris shrub flower peak tree stalk hill cave tower boulder stones grass1 grass2 grass3 grass4 debris1',
  'water1 water2 bloop1 bloop2 fire1 fire2 glob donut stone lightning1 lightning2 effectA1 effectA2 effectB1 effectB2 effectC1 effectC2 droplets1 droplets2 effectD1 effectD2 flame1 flame2',
  'wall rubble whirl1 whirl2 carpet1 carpet2 foundation bridge path path1 path2 path3 path4 door_closed door_open gate_closed gate_open stairs_up stairs_down statue crate1 crate2 tombstone',
  'man man_sword woman woman_sword demon boney_n spider ruffian snake mozzie crab flathead frogman nugget goober orb blob silverfish chicken frog wisp bat ghost',
  'potion_empty potion_full sword battleaxe shield wand bow pickaxe shovel arrows chestplate boot coins chest meat key thing1 thing2 bomb column ring gem mushroom skull bones oar club page',
  '! @ # $ % ^ & * ( ) - = + . , : ; quotes < > ? backslash / | hyphen colon prev next',
  'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z up down',
  '1 2 3 4 5 6 7 8 9 0 happy sad pointer_right pointer_down pointer_left pointer_up music square circle circle_empty check_small check_big pill dot box underscore left right'
]

const output = {
  meta: {
    image: filename + '.png'
  },
  frames: {}
}

for (let y = 0; y < labels.length; y++) {
  const row = labels[y].split(' ')
  for (let x = 0; x < row.length; x++) {
    output.frames[row[x]] = {
      frame: {
        x: x * spriteWidthPx,
        y: y * spriteHeightPx,
        w: spriteWidthPx,
        h: spriteHeightPx
      }
      // spriteSourceSize: {
      //   x: 0,
      //   y: 0,
      //   w: spriteWidthPx,
      //   h: spriteHeightPx
      // },
      // sourceSize: {
      //   w: spriteWidthPx,
      //   h: spriteHeightPx
      // }
    }
  }
}

const json = JSON.stringify(output)

fs.writeFileSync(filename + '.json', json, (err) => {
  if (err) {
    console.error(err)
  }
})

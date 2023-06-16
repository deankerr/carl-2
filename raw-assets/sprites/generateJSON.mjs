#!/usr/bin/env node
import fs from 'fs'

const outputDir = './src/public/assets/'

const sheets = [
  {
    name: 'oryx16',
    width: 16,
    height: 16,
    labels: [
      'grass debris shrub flower peak tree plant hill cave tower _boulder _stones',
      'water1 water2 bloop1 bloop2 fire1 fire2 glob donut stone lightning1 lightning2 effectA1 effectA2 effectB1 effectB2 effectC1 effectC2 droplets1 droplets2 effectD1 effectD2 flame1 flame2',
      'wall rubble whirl1 whirl2 carpet1 carpet2 foundation bridge path path1 path2 path3 path4 door_closed door_open gate_closed gate_open stairs_up stairs_down statue crate1 crate2 tombstone',
      'man man_sword woman woman_sword demon boney_n spider ruffian snake mozzie crab flathead frogman nugget goober orb blob silverfish chicken frog wisp bat ghost',
      'potion_empty potion_full sword battleaxe shield wand bow pickaxe shovel arrows chestplate boot coins chest meat key thing1 thing2 bomb column ring gem mushroom skull bones oar club page',
      '! @ # $ % ^ & * ( ) - = + . , : ; quotes < > ? backslash / | hyphen colon prev next',
      'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z up down',
      '1 2 3 4 5 6 7 8 9 0 happy sad pointer_right pointer_down pointer_left pointer_up music square circle circle_empty check_small check_big pill dot box underscore left right',
    ],
  },
  {
    name: 'environment16',
    width: 16,
    height: 16,
    labels: [
      'water_A1 water_A2 water_B1 water_B2 water_C1 water_C2 water_D1 water_D2',
      'grass_a1 grass_a2 grass_a3 grass_a4 grass_a5 grass_a6 grass_a7 grass_a8',
      'grass_b1 grass_b2 grass_b3 grass_b4 grass_b5 grass_b6 grass_b7 grass_b8',
      'flower_1 flower_2 flower_3 flower_4 flower_5 flower_6 flower_7 flower_8',
      'boulder rocks_1 rocks_2 rocks_3 rocks_4 rocks_5 rocks_6 rocks_7 rocks_8',
      'mushroom_1 mushroom_2 mushroom_3 mushroom_4',
      'shrub_1',
      'plant_1',
    ],
  },
]

for (const sheet of sheets) {
  const { name, width, height, labels } = sheet

  const meta = { image: name + '.png' }
  const frames = {}

  for (let y = 0; y < labels.length; y++) {
    const row = labels[y].split(' ')
    for (let x = 0; x < row.length; x++) {
      frames[row[x]] = {
        frame: {
          x: x * width,
          y: y * height,
          w: width,
          h: height,
        },
      }
    }
  }

  const output = JSON.stringify({ meta, frames })

  fs.writeFileSync(outputDir + name + '.json', output, (err) => {
    if (err) {
      console.error(err)
    }
  })
}

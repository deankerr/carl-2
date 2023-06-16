import { config } from '@'
import { app } from '@lib'
import {
  AdvancedBloomFilter,
  CRTFilter,
  GodrayFilter,
  ReflectionFilter,
} from 'pixi-filters'
import { Filter } from 'pixi.js'

export function createFilterSystem() {
  const godrays = new GodrayFilter()

  const advBloom = new AdvancedBloomFilter({
    threshold: 0.3,
    bloomScale: 1.5,
    brightness: 1,
  })

  const crt = new CRTFilter({
    lineWidth: 1,
    lineContrast: 0.25,
    noise: 0.1,
    // noiseSize: 3,
    // vignetting: 0.25,
    // vignettingAlpha: 0.9,
  })

  const reflection = new ReflectionFilter({
    // mirror: false,
    boundary: 0.77,
    amplitude: [0, 10],
    alpha: [0.8, 1],
  })

  const active: Filter[] = []

  active.push(advBloom)
  active.push(godrays)
  active.push(reflection)
  active.push(crt)

  app.stage.filters = config.enableDemoFilters ? active : []

  return (dt: number) => {
    godrays.time += dt / 100
    crt.time += dt / 15
    reflection.time += dt / 100
  }
}

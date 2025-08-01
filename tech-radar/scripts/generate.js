import data from '../data/radar.json' with { type: 'json' }
import { mapEntries } from '../radar/entries-mapper.js'

import { buildRadar } from '../radar/radar-builder.js'
import { exportAsPng, exportAsSvg } from '../radar/exporter.js'

async function main() {
  const entries = mapEntries(data.entries)
  const svg = await buildRadar(entries)

  await exportAsPng(svg, `dist/radar.png`, 1450, 1000)
  await exportAsSvg(svg, `dist/radar.svg`)
}

await main()

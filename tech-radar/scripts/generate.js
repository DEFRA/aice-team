import data from '../data/radar.json' with { type: 'json' }
import { mapEntries } from '../radar/entries-mapper.js'

import { buildRadar } from '../radar/radar-builder.js'

async function main() {
  const entries = mapEntries(data.entries)
  const rawSvg = await buildRadar(entries)
}

await main()

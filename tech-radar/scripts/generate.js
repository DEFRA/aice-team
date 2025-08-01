import data from '../data/radar.json' with { type: 'json' }

import { buildRadar } from '../radar/radar-builder.js'

async function main() {
  const rawSvg = await buildRadar(data.entries)
}

await main()

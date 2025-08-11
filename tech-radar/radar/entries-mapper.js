import { RADAR_QUADRANT_MAP, RADAR_RING_MAP } from './constants.js'

function mapEntries (rawEntries) {
  const mappedEntries = rawEntries.map((entry) => {
    return {
      label: entry.title,
      quadrant: RADAR_QUADRANT_MAP[entry.quadrant],
      ring: RADAR_RING_MAP[entry.ring],
      moved: 0,
      link: entry.url,
      active: entry.active
    }
  })
  
  return mappedEntries
}

export {
  mapEntries
}

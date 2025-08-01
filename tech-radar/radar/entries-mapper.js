import { RADAR_QUADRANT_MAP, RADAR_RING_MAP } from './constants.js'

function mapEntries (rawEntries) {
  const mappedEntries = rawEntries.map((e) => {
    return {
      label: e.title,
      quadrant: RADAR_QUADRANT_MAP[e.quadrant],
      ring: RADAR_RING_MAP[e.ring],
      moved: 0
    }
  })
  
  return mappedEntries
}

export {
  mapEntries
}

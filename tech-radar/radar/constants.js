const RADAR_QUADRANT_NAMES = {
  TECHNIQUES: 'Techniques',
  FRAMEWORKS: 'Frameworks',
  TOOLS: 'Tools',
  PLATFORMS: 'Platforms'
}

const RADAR_RING_NAMES = {
  ADOPT: 'Adopt',
  PILOT: 'Pilot',
  ASSESS: 'Assess',
  HOLD: 'Hold'
}

const RADAR_QUADRANT_MAP = Object.keys(RADAR_QUADRANT_NAMES).reduce((map, key, index) => {
  map[RADAR_QUADRANT_NAMES[key]] = index

  return map
}, {})

const RADAR_RING_MAP = Object.keys(RADAR_RING_NAMES).reduce((map, key, index) => {
  map[RADAR_RING_NAMES[key]] = index

  return map
}, {})

const RADAR_RING_COLOUR_MAP = {
  [RADAR_RING_NAMES.ADOPT]: '#4CAF50',
  [RADAR_RING_NAMES.PILOT]: '#FFC107',
  [RADAR_RING_NAMES.ASSESS]: '#2196F3',
  [RADAR_RING_NAMES.HOLD]: '#F44336'
}

export {
  RADAR_QUADRANT_NAMES,
  RADAR_RING_NAMES,
  RADAR_QUADRANT_MAP,
  RADAR_RING_MAP,
  RADAR_RING_COLOUR_MAP
}

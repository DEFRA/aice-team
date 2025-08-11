import { JSDOM } from 'jsdom'

import { radar_visualization as radarVisualization } from '../lib/radar.js'
import { RADAR_QUADRANT_MAP, RADAR_RING_COLOUR_MAP, RADAR_RING_MAP } from '../radar/constants.js'

async function buildRadar (entries) {
  const jsdom = new JSDOM('<html><body></body></html>', { pretendToBeVisual: true })

  const svg = jsdom.window.document.createElement('svg')
  svg.setAttribute('id', 'radar')

  jsdom.window.document.body.appendChild(svg)

  await radarVisualization(
    jsdom.window.document, {
      repo_url: 'https://defra.github.io/aice-team',
      svg_id: 'radar',
      width: 1450,
      height: 1000,
      scale: 1.0,
      colors: {
        background: '#fff',
        grid: '#bbb',
        inactive: '#ddd'
      },
      font_family: 'Arial, Helvetica',
      title: 'Defra AI Capabilities and Enablement (AICE) Tech Radar',
      quadrants: Object.keys(RADAR_QUADRANT_MAP).map(name => ({ name })),
      rings: Object.keys(RADAR_RING_MAP).map(name => ({ name, color: RADAR_RING_COLOUR_MAP[name] })),
      print_layout: true,
      links_in_new_tabs: true,
      entries
    }
  )

  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  // JSDOM auto-converts attributes to lowercase, 'viewBox' however is case-sensitive.
  // Workaround is to replace 'viewbox' with 'viewBox' in the final HTML.
  const html = jsdom.window.document.querySelector('#radar').outerHTML

  return html.replace('viewbox=', 'viewBox=')
}

export {
  buildRadar
}

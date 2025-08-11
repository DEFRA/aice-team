import fs from 'fs/promises'
import path from 'path'

import sharp from 'sharp'

async function exportAsPng(svg, filePath, width = 1450, height = 1000) {
  const buffer = await sharp(Buffer.from(svg), { density: 96 })
    .flatten({ background: '#fff' })
    .resize(width, height)
    .png()
    .toBuffer()

  const dir = path.dirname(filePath)

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, buffer)
}

async function exportAsSvg(svg, filePath) {
  const buffer = Buffer.from(svg)

  const dir = path.dirname(filePath)

  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(filePath, buffer)
}

export {
  exportAsPng,
  exportAsSvg
}

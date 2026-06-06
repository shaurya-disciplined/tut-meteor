import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'

// Route segment config
export const runtime = 'nodejs'

// Image metadata
export const size = {
  width: 256,
  height: 256,
}
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  const imagePath = path.join(process.cwd(), 'IMAGES/fevicon.png')
  const imageData = fs.readFileSync(imagePath)
  const imageBase64 = `data:image/png;base64,${imageData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          overflow: 'hidden',
          background: 'transparent',
        }}
      >
        <img src={imageBase64} width="256" height="256" style={{ objectFit: 'cover' }} />
      </div>
    ),
    { ...size }
  )
}

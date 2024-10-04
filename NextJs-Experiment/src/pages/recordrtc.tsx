import { Box, Button } from '@mui/material'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'
export default function RecordrtcPage(): ReactElement {
  // In this context, "mod" is a reference to the module that's returned by the dynamic import
  const VideoRecording = dynamic(
    () =>
      import('../components/VideoRecording').then(mod => mod.VideoRecording),
    { ssr: false }
  )

  return (
    <>
      <Box>
        <VideoRecording />
        <Button href="/" sx={{ position: 'absolute', right: '0%' }}>
          Back To Home
        </Button>
      </Box>
    </>
  )
}

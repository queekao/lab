import { Button } from '@mui/material'
import { ReactElement } from 'react'
import { useState, useRef, useEffect } from 'react'
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc'
export const VideoRecording = (): ReactElement => {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [blob, setBlob] = useState<Blob | null>(null)
  const [videoUrl, setVideoUrl] = useState('')

  const refVideo = useRef<HTMLVideoElement>(null)
  const recorderRef = useRef<RecordRTC | null>(null)

  async function getMedia() {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true
    })
    // Use the stream as needed
    setStream(cameraStream)
    // const mediaStream = await navigator.mediaDevices.getDisplayMedia({
    //   video: {
    //     width: 1920,
    //     height: 1080,
    //     frameRate: 30
    //   },
    //   audio: true
    // })
    recorderRef.current = new RecordRTC(cameraStream, {
      type: 'video',
      ondataavailable: function (blob) {
        console.log(blob)
      }
    })
  }
  const handleTurnOnCamera = () => {
    getMedia()
  }
  const handleRecording = async () => {
    if (recorderRef.current) {
      recorderRef.current.startRecording()
    }
  }

  const handleStop = () => {
    if (recorderRef.current) {
      recorderRef.current.stopRecording(() => {
        if (recorderRef.current) {
          setBlob(recorderRef.current.getBlob())
          const url = URL.createObjectURL(recorderRef.current.getBlob())
          setVideoUrl(url)
        }
      })
    }
  }

  const handleSave = () => {
    if (blob) {
      invokeSaveAsDialog(blob)
    }
  }
  const handleTurnOffCamera = () => {
    // Erase all recorded data
    if (recorderRef.current) {
      recorderRef.current?.clearRecordedData()
      handleStop()
      recorderRef.current = null
    }
    // Wipe out the video src
    if (refVideo.current) {
      refVideo.current.pause()
      setVideoUrl('')
    }
    stream?.getTracks().forEach(function (track) {
      console.log('turn off')
      track.stop()
    })
    setStream(null)
  }
  useEffect(() => {
    if (!refVideo.current) {
      return
    }
  }, [stream, refVideo])
  return (
    <>
      <Button onClick={handleTurnOnCamera}>Turn On Camera</Button>
      {stream && <Button onClick={handleRecording}>Start</Button>}
      {stream && <Button onClick={handleStop}>Stop</Button>}
      {blob && <Button onClick={handleTurnOffCamera}>Turn Off Camera</Button>}
      {blob && <Button onClick={handleSave}>Save</Button>}
      {blob && (
        <video
          src={videoUrl}
          controls
          autoPlay
          ref={refVideo}
          style={{ width: '700px', margin: '1em' }}
        />
      )}
    </>
  )
}

import { useEffect, useState, useRef } from 'react'
import { usePDF417Decoder } from '../hooks/usePDF417Decoder'
import { useDataStudent } from '../hooks/useDataStudent'
import { useError } from '../hooks/useError'

export const VideoScanner = ({frontOrBack}) => {
    const videoRef = useRef(null)
    const canvasRef = useRef(null)
    const [ isMobile, setIsMobile ] = useState(false)
    const [ cameraActive, setCameraActive ] = useState(false)

    const { decodePDF417 } = usePDF417Decoder()
    const { updateData } = useDataStudent()
    const { changeError } = useError()

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera
        const mobile = /android|iphone|ipad|ipod|iemobile|opera mini/i.test(userAgent)
        setIsMobile(mobile)
    }, [])

    const startDesktopCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true })
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            setCameraActive(!cameraActive)
          }
        } catch (err) {
          console.error("No se pudo acceder a la cámara:", err)
          changeError("Error al acceder a la cámara")
        }
    }

    useEffect(() => {
        if (!cameraActive) return

        const canvas = document.createElement('canvas')
        canvasRef.current = canvas
        const ctx = canvas.getContext('2d')

        const scanImageVideo = async () => {
            const video = videoRef.current
            if (!video || !ctx) return

            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

            const img = new Image()
            img.src = canvas.toDataURL('image/png')
            console.log(img.src)

            img.onload = async () => {
                try {
                    await decodePDF417(ctx, img, frontOrBack)
                    updateData(img)
                } catch (err) {
                    changeError('No se pudo decodificar la imagen, compruebe que posea código de DNI argentino y que este enfocado.')
                    console.error(err)
                }
            }
        }
        
        const intervalId = setInterval(() => {
            scanImageVideo()
        }, 500)

        return () => clearInterval(intervalId)
    }, [cameraActive])

    return (
        <div>
            {
                isMobile ? (
                    <div>
                        <input ref={videoRef} type="file" accept="image/*" capture="environment" />
                    </div>
                ) : (
                    <div>
                        <div style={{ marginTop: '10px' }}>
                            <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{
                                display: cameraActive ? 'block' : 'none',
                                width: '100%',
                                maxWidth: '500px'
                            }}
                            />
                        </div>
                        <button onClick={startDesktopCamera}>
                            {cameraActive ? 'Desactivar' : 'Activar'} cámara
                        </button>
                    </div>
                )
            }
        </div>
    )
}
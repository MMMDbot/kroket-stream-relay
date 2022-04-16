import React, { useEffect } from 'react'
import { useUser } from './context/UserState'

export default function WatermarkPreview(props) {
    const API_SERVER = process.env.REACT_APP_API_SERVER
    const {
        state: { userId },
    } = useUser()

    useEffect(() => {
        let imageLoadedCounter = 0
        function onLoadCallback() {
            imageLoadedCounter++
            if (imageLoadedCounter === 2) {
                drawImages()
            } else {
                return
            }
        }
        function drawImages() {
            ctx.drawImage(background, 0, 0, 640, 360)
            ctx.drawImage(foreground, 555, 10)
        }
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        let background = new Image()
        background.src = `${API_SERVER}/img/canvasbg.jpg`
        let foreground = new Image()
        foreground.src = `${API_SERVER}/img/watermarks/${userId}.png?v=${Date.now()}`
        background.onload = () => onLoadCallback()
        foreground.onload = () => onLoadCallback()
    }, [props.watermark, userId, API_SERVER])
    return (
        <div>
            <div className="image-watermark">
                <canvas
                    crossOrigin="Anonymous"
                    width="640"
                    height="360"
                    id="canvas"
                ></canvas>
            </div>
        </div>
    )
}

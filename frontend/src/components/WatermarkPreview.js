import React, { useEffect } from 'react'
import { useUser } from './context/UserState'

export default function WatermarkPreview(props) {
    const {
        state: { userId },
    } = useUser()

    console.log(props.watermark)

    useEffect(() => {
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        let background = new Image()
        background.src = 'http://localhost:3001/img/canvasbg.jpg'
        let foreground = new Image()
        foreground.src = `http://localhost:3001/img/watermarks/${userId}.png?v=${Date.now()}`
        background.onload = function () {
            ctx.drawImage(background, 0, 0, 640, 360)
        }
        foreground.onload = function () {
            ctx.drawImage(foreground, 555, 10)
        }
    }, [props.watermark, userId])
    return (
        <div>
            <div class="image-watermark">
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

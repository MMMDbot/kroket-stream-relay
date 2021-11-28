import React, { useEffect } from 'react'

export default function WatermarkPreview(props) {
    console.log(props.watermark)

    useEffect(() => {
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        let background = new Image()
        background.src = 'http://localhost:3001/img/canvasbg.jpg'
        let foreground = new Image()
        foreground.src = `http://localhost:3001/img/watermarks/${
            props.user.id
        }.png?v=${Date.now()}`
        background.onload = function () {
            ctx.drawImage(background, 0, 0, 640, 360)
        }
        foreground.onload = function () {
            ctx.drawImage(foreground, 555, 10)
        }
    }, [props.watermark])
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

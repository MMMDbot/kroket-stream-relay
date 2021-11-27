import React from 'react'

export default function WatermarkPreview(props) {
    console.log(props.user)
    return (
        <div class="image-watermark">
            <canvas
                crossOrigin="Anonymous"
                width="1280"
                height="720"
                id="canvas"
            ></canvas>
        </div>
    )
}

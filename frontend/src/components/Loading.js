import React from 'react'
import ReactLoading from 'react-loading'

export default function Loading(props) {
    return (
        <div className="container-fluid">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: props.height ? props.height : '100vh',
                }}
            >
                <ReactLoading type="spin" color="#000" />
            </div>
        </div>
    )
}

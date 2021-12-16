import React from 'react'
import StatusBadge from './StatusBadge'

export default function StreamTitle(props) {
    return (
        <div>
            <h2
                style={{
                    display: 'inline-block',
                    textTransform: 'capitalize',
                }}
            >
                {props.name}
            </h2>
            <StatusBadge active={props.active} />
        </div>
    )
}

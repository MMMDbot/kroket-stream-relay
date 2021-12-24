import React from 'react'
import Badge from 'react-bootstrap/Badge'

export default function StatusBadge(props) {
    return (
        <span
            style={
                props.featured
                    ? {
                          position: 'absolute',
                          marginTop: '10px',
                      }
                    : null
            }
        >
            <Badge
                className="mx-2"
                pill
                bg={props.active ? 'danger' : 'secondary'}
            >
                {props.active ? 'Online' : 'Offline'}
            </Badge>
        </span>
    )
}

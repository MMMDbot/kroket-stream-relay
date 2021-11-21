import React from 'react'
import Badge from 'react-bootstrap/Badge'

export default function StatusBadge(props) {
    return (
        <span>
            <Badge pill bg={props.active ? 'danger' : 'secondary'}>
                {props.active ? 'Online' : 'Offline'}
            </Badge>
        </span>
    )
}

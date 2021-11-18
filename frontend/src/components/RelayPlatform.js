import React from 'react'
import { upperFirst } from 'lodash'
import Badge from 'react-bootstrap/Badge'

export default function RelayPlatform(props) {
    const platformUpper = upperFirst(props.platform)
    return (
        <span>
            <Badge pill bg="primary">
                {platformUpper}
            </Badge>
        </span>
    )
}

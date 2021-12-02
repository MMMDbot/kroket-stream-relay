import React from 'react'
import { DateTime } from 'luxon'

const units = ['year', 'month', 'week', 'day', 'hour', 'minute', 'second']

export const timeAgo = (date) => {
    let dateTime = DateTime.fromISO(date)
    const diff = dateTime.diffNow().shiftTo(...units)
    const unit = units.find((unit) => diff.get(unit) !== 0) || 'second'

    const relativeFormatter = new Intl.RelativeTimeFormat('en', {
        numeric: 'auto',
    })
    return relativeFormatter.format(Math.trunc(diff.as(unit)), unit)
}

export default function useTimestamp(created_at) {
    return <>Created {timeAgo(created_at)}</>
}

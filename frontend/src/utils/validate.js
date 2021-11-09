function validateIngestForm(origin) {
    if (origin.includes('.m3u8') || origin.includes('youtu')) {
        return true
    } else {
        return false
    }
}

function arraysEqual(a1, a2) {
    return JSON.stringify(a1) === JSON.stringify(a2)
}

async function validateRelayForm(oldTargets) {
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    }
    const newTargets = await fetch(
        'http://localhost:3001/api/targets/org/available',
        requestOptions
    )
    const newTargetsJSON = await newTargets.json()
    const newTargetsIds = newTargetsJSON.map((element) => element.id)
    console.log(newTargetsIds)

    const oldTargetsIds = oldTargets.map((element) => element.id)
    return arraysEqual(oldTargetsIds, newTargetsIds)
}

export { validateIngestForm, validateRelayForm }

function validateIngestForm(origin) {
    if (origin.includes('.m3u8') || origin.includes('youtu')) {
        return true
    } else {
        return false
    }
}

function selectionInAvailable(selectionIds, availableTargetsIds) {
    let result = false
    for (let i = 0; i < selectionIds.length; i++) {
        if (availableTargetsIds.includes(selectionIds[i])) {
            result = true
        } else {
            result = false
        }
    }
    return result
}

async function validateRelayForm(selection) {
    const API_SERVER = process.env.REACT_APP_API_SERVER
    const requestOptions = {
        method: 'GET',
        credentials: 'include',
    }
    const newTargets = await fetch(
        `${API_SERVER}/api/targets/org/available`,
        requestOptions
    )
    const newTargetsJSON = await newTargets.json()
    const availableTargetsIds = newTargetsJSON.map((element) => element.id)
    console.log(availableTargetsIds)

    const selectionIds = selection.map((element) => element.id)
    console.log(selectionIds)
    return selectionInAvailable(selectionIds, availableTargetsIds)
}

export { validateIngestForm, validateRelayForm }

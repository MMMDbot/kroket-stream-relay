function validateIngestForm(origin) {
    if (origin.includes('.m3u8') || origin.includes('youtu')) {
        return true
    } else {
        return false
    }
}

export { validateIngestForm }

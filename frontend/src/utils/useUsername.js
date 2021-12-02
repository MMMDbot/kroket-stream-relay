import React, { useState, useEffect } from 'react'

export default function useUsername(user_id) {
    const [username, setUsername] = useState()
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`http://localhost:3001/api/user/${user_id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username)
            })
    })
    return <>{username}</>
}

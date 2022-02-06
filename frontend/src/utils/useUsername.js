import React, { useState, useEffect } from 'react'

export default function useUsername(user_id) {
    const [username, setUsername] = useState()
    const API_SERVER = process.env.REACT_APP_API_SERVER

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
        fetch(`${API_SERVER}/api/user/${user_id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setUsername(data.username)
            })
    })
    return <>{username}</>
}

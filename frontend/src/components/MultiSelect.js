import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import AsyncSelect from 'react-select/async'

export default function MultiSelect() {
    const [selection, setSelection] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch('http://localhost:3001/api/multiselect', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOptions(data)
            })
    }, [])

    const submitRelays = (e) => {
        e.preventDefault()

        console.log(selection)
    }

    return (
        <Form onSubmit={submitRelays}>
            <Select
                isMulti
                options={options}
                onChange={(e) => {
                    setSelection(e)
                }}
            />
            <Button type="submit">Start relays 🎃</Button>
        </Form>
    )
}

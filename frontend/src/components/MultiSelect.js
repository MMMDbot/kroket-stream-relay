import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import AsyncSelect from 'react-select/async'

export default function MultiSelect() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]
    const [selection, setSelection] = useState([])
    const [opciones, setOpciones] = useState([])

    /*     const requestOptions = {
        method: 'GET',
        credentials: 'include',
    }
    const promiseOptions = fetch(
        'http://localhost:3001/api/multiselect',
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            return data
        }) */

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch('http://localhost:3001/api/multiselect', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOpciones(data)
            })
    }, [])

    const submitRelays = (e) => {
        e.preventDefault()
        console.log(selection)
    }

    return (
        <Form onSubmit={submitRelays}>
            <AsyncSelect
                isMulti
                cacheOptions
                loadOptions={opciones}
                onChange={(e) => {
                    setSelection(e)
                }}
            />
            <Button type="submit">Start relays 🎃</Button>
        </Form>
    )
}

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

    const groupedOptions = [
        {
            label: 'YouTube',
            options: opciones,
        },
        {
            label: 'Dailymotion',
            options: opciones,
        },
        {
            label: 'Twitter',
            options: opciones,
        },
    ]

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch('http://localhost:3001/api/targets/org/available', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                const preformatArray = data.availableTargets
                const reformatArray = preformatArray.map((obj) => {
                    obj.label = obj.description
                    obj.value = obj.description
                    return obj
                })
                console.log('Reformat Array is : ')
                console.log(reformatArray)
                setOpciones(data.availableTargets)
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
                options={groupedOptions}
                onChange={(e) => {
                    setSelection(e)
                }}
            />
            <Button type="submit">Start relays 🎃</Button>
        </Form>
    )
}

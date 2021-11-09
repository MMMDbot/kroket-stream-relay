import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { validateRelayForm } from '../utils/validate'

export default function MultiSelect() {
    const [selection, setSelection] = useState([])
    const [options, setOptions] = useState([])
    const [oldTargets, setOldTargets] = useState([])

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
        fetch('http://localhost:3001/api/targets/org/available', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setOldTargets(data.map((element) => element.id))
            })
    }, [])

    const submitRelays = (e) => {
        e.preventDefault()
        validateRelayForm(selection)
        console.log(oldTargets)
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

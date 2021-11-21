import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import StreamRelays from './StreamRelays'

import { validateRelayForm } from '../utils/validate'

export default function MultiSelect(props) {
    const [selection, setSelection] = useState([])
    const [options, setOptions] = useState([])
    const [reload, setReload] = useState({ value: false })

    console.log(selection)

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

    async function validateRelay(selection) {
        const res = await validateRelayForm(selection)
        return res
    }

    const submitRelays = (e) => {
        e.preventDefault()
        validateRelay(selection).then((valid) => {
            if (valid) {
                console.log('Form is valid')
                console.log('Result of the form is:')
                console.log(selection)
                console.log('Ingest ID is:')
                console.log(props.streamId)
                const requestOptions = {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ingestId: props.streamId,
                        targets: selection,
                    }),
                }

                fetch('http://localhost:3001/api/relay', requestOptions)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.id) {
                            console.log(data)
                            setReload({ value: !reload.value })
                            console.log('reload is')
                            console.log(reload)
                            setSelection([])
                        } else {
                            console.log('Error executing relay function.')
                        }
                    })
            } else {
                console.log('Form is not valid')
            }
        })
    }
    const reloaderTrue = (e) => {
        e.preventDefault()
        setReload({ value: 'true' })
    }

    return (
        <div>
            <Form onSubmit={submitRelays}>
                <Select
                    value={selection}
                    isMulti
                    isClearable
                    options={options}
                    onChange={(e) => {
                        setSelection(e)
                    }}
                />
                <Button type="submit">Start relays 🎃</Button>
                <Button onClick={reloaderTrue}>set Reloader</Button>
            </Form>
            <StreamRelays streamId={props.streamId} reloader={reload} />
        </div>
    )
}

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
    const API_SERVER = process.env.REACT_APP_API_SERVER

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            credentials: 'include',
        }
        fetch(`${API_SERVER}/api/multiselect`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setOptions(data)
            })
    }, [API_SERVER])

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

                fetch(`${API_SERVER}/api/relay`, requestOptions)
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

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted gray',
            padding: 8,
            cursor: 'pointer',
            backgroundColor: state.isFocused
                ? 'rgb(53, 53, 53)'
                : 'rgb(40, 40, 40)',
            color: state.isFocused
                ? 'rgb(250, 250, 250)'
                : 'rgb(168, 168, 168)',
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
            borderWidth: '2px',
            borderColor: '#626262',
        }),
        multiValue: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(55, 90, 127)',
            borderRadius: '8px',
        }),
        multiValueLabel: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
        menuList: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(43, 43, 43)',
        }),
        valueContainer: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(32, 33, 37)',
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            backgroundColor: 'rgb(49, 50, 54)',
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            ':hover': {
                color: 'white',
            },
        }),
        clearIndicator: (provided, state) => ({
            ...provided,
            ':hover': {
                color: 'white',
            },
        }),
    }

    return (
        <div>
            <h4>Pick destinations for this stream</h4>
            <Form onSubmit={submitRelays}>
                <Select
                    styles={customStyles}
                    value={selection}
                    isMulti
                    isClearable
                    options={options}
                    onChange={(e) => {
                        setSelection(e)
                    }}
                />
                <div className="d-grid gap-2 pt-2">
                    <Button
                        disabled={selection.length === 0 ? true : false}
                        type="submit"
                    >
                        Start
                    </Button>
                </div>
            </Form>
            <StreamRelays streamId={props.streamId} reloader={reload} />
        </div>
    )
}

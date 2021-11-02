import React, { useState } from 'react'
import Select from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function MultiSelect() {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]
    const [selection, setSelection] = useState([])

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

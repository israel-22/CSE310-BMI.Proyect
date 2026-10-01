import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getChildren, createChild } from '../services/api'

function Children() {

    const [children, setChildren] = useState([])
    const [identification, setIdentification] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [birthDate, setBirthDate] = useState('')

    useEffect(() => {

        async function loadChildren() {

            try {
                const data = await getChildren()
                setChildren(data)
            } catch (error) {
                console.error('Error loading children:', error)
            }

        }

        loadChildren()

    }, [])

    async function handleSubmit(event) {

        event.preventDefault()

        const child = {
            identification,
            firstName,
            lastName,
            birthDate
        }

        try {

            const createdChild = await createChild(child)

            setChildren(previousChildren => [
                ...previousChildren,
                createdChild
            ])

            setIdentification('')
            setFirstName('')
            setLastName('')
            setBirthDate('')

        } catch (error) {

            console.error('Error creating child:', error)

        }
    }

    return (
        <div>
            <h1>Children</h1>
            <h2>New Child</h2>

            <form onSubmit={handleSubmit}>

                <div>
                    <label>
                        Identification
                    </label>

                    <input
                        type="text"
                        value={identification}
                        onChange={event => setIdentification(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        First Name
                    </label>

                    <input
                        type="text"
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        Last Name
                    </label>

                    <input
                        type="text"
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>
                        Birth Date
                    </label>

                    <input
                        type="date"
                        value={birthDate}
                        onChange={event => setBirthDate(event.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Save Child
                </button>

            </form>

            {children.map(child => (
                <div key={child.identification}>

                    <p>
                        <strong>{child.identification}</strong>
                        {' - '}
                        {child.firstName} {child.lastName}
                        {' - '}
                            {child.birthDate}
                    </p>

                    <Link to={`/child-record?id=${child.identification}`}>
                        <button type="button">
                            Open Record
                        </button>
                    </Link>

                    <hr />

                </div>
            ))}
        </div>
    )
}

export default Children